import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import "../App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HigherStudiesReport = () => {
  const [reportData, setReportData] = useState([]);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [details, setDetails] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [show, setShow] = useState(false);

  const componentRef = useRef(null);

  const yearOptions = [2019, 2020, 2021, 2022, 2023, 2024];

  const isSingleYear = fromYear && toYear && fromYear === toYear;

  const fetchReport = async () => {
    try {
      const query = `?from=${fromYear}&to=${toYear}`;
      const res = await axios.get(
        `http://localhost:8080/api/higherStudies/generate-heigherStudies-report${query}`
      );

      const formattedData = res.data.map((item) => ({
        year: `${item._id}`,
        count: item.total,
      }));

      setReportData(formattedData);
      setShow(true);

      if (isSingleYear) {
        fetchDetails(fromYear);
      } else {
        setDetails([]);
      }
    } catch (err) {
      console.error("Error generating report", err);
    }
  };

  const fetchDetails = async (year) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/higherStudies/details/${year}`
      );
      setDetails(res.data);
      setSelectedYear(year);
      if (!isSingleYear) setOpenModal(true); // Avoid modal for single year view
    } catch (err) {
      console.error("Error fetching details", err);
    }
  };

  return (
    <div style={{ padding: "2rem" }} ref={componentRef} className="report">
      <Typography variant="h4" gutterBottom color="maroon">
        Higher Studies Report (Year-Wise)
      </Typography>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="to-year-label">From Year</InputLabel>
          <Select
            labelId="From-year-label"
            value={fromYear}
            onChange={(e) => setFromYear(e.target.value)}
            label="From Year"
          >
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="to-year-label">To Year</InputLabel>
          <Select
            labelId="to-year-label"
            value={toYear}
            onChange={(e) => setToYear(e.target.value)}
            label="To Year"
          >
            {yearOptions.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          sx={{ bgcolor: "purple" }}
          onClick={fetchReport}
        >
          Generate Report
        </Button>
      </div>

      {show && !isSingleYear && (
        <>
          <Button
            variant="outlined"
            onClick={() => window.print()}
            sx={{ mb: 2 }}
          >
            Print / Save as PDF
          </Button>

          <TableContainer component={Paper} sx={{ mb: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Batch</TableCell>
                  <TableCell>No of Students Opted Higher Studies</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((row) => (
                  <TableRow
                    key={row.year}
                    onClick={() => fetchDetails(row.year)}
                    style={{ cursor: "pointer" }}
                  >
                    <TableCell>
                      {row.year - 1}-{row.year}
                    </TableCell>
                    <TableCell>{row.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            No of students Opted Higher Studies
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={reportData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1976d2" />
            </BarChart>
          </ResponsiveContainer>
        </>
      )}

      {/* 👇 Table for SINGLE YEAR view */}
      {isSingleYear && details.length > 0 && (
        <>
          <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Detailed Report for Year {fromYear}
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Roll No</TableCell>
                  <TableCell>Branch</TableCell>
                  <TableCell>Mobile Number</TableCell>
                  <TableCell>Email Address</TableCell>
                  <TableCell>Passed Out Year</TableCell>
                  <TableCell>Opted Institute Name</TableCell>
                  <TableCell>Year Of Admission</TableCell>
                  <TableCell>Specialization</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.map((student) => (
                  <TableRow key={student.rollNo}>
                    <TableCell>{student.name}</TableCell>
                    <TableCell>{student.rollNo}</TableCell>
                    <TableCell>{student.branch}</TableCell>
                    <TableCell>{student.mobileNo}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.passedOutYear}</TableCell>
                    <TableCell>{student.joiningInstituteName}</TableCell>
                    <TableCell>{student.yearOfAdmission}</TableCell>
                    <TableCell>{student.course}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      {/* Modal for multi-year click */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle>
          Detailed Report - {selectedYear}
          <IconButton
            aria-label="close"
            onClick={() => setOpenModal(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Roll No</TableCell>
                <TableCell>Branch</TableCell>
                <TableCell>Mobile Number</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>Passed Out Year</TableCell>
                <TableCell>Opted Institute Name</TableCell>
                <TableCell>Year Of Admission</TableCell>
                <TableCell>Specialization</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {details.map((student) => (
                <TableRow key={student.rollNo}>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.rollNo}</TableCell>
                  <TableCell>{student.branch}</TableCell>
                  <TableCell>{student.mobileNo}</TableCell>
                  <TableCell>{student.email}</TableCell>
                  <TableCell>{student.passedOutYear}</TableCell>
                  <TableCell>{student.joiningInstituteName}</TableCell>
                  <TableCell>{student.yearOfAdmission}</TableCell>
                  <TableCell>{student.course}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HigherStudiesReport;
