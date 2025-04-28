import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
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
import CloseIcon from "@mui/icons-material/Close";
import Container from "@mui/material/Container";

const ExamReport = () => {
  const [originalData, setOriginalData] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [groupedData, setGroupedData] = useState({});
  const [show, setShow] = useState(false);
  const [selectedYear, setSelectedYear] = useState(null);
  const [detailedData, setDetailedData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

  const handleYearClick = async (year) => {
    try {
      setSelectedYear(year);
      const res = await axios.get(
        `http://localhost:8080/api/higherStudies/year-wise-detail/${year}`
      );
      setDetailedData(res.data);
      setOpenModal(true);
    } catch (err) {
      console.error("Error fetching year-wise detail", err);
    }
  };

  const handleGenerateReport = () => {
    if (!fromYear || !toYear) {
      alert("Please select both From and To years.");
      return;
    }

    const filtered = originalData.filter(
      (item) =>
        item.passedOutYear >= parseInt(fromYear) &&
        item.passedOutYear <= parseInt(toYear)
    );

    const grouped = {};
    filtered.forEach(({ examType, passedOutYear, count }) => {
      if (!grouped[examType]) grouped[examType] = {};
      grouped[examType][passedOutYear] = count;
    });

    const yearMap = {};
    filtered.forEach(({ examType, passedOutYear, count }) => {
      if (!yearMap[passedOutYear])
        yearMap[passedOutYear] = { year: passedOutYear };
      yearMap[passedOutYear][examType] = count;
    });

    const chartData = Object.values(yearMap).sort((a, b) => a.year - b.year);

    setGroupedData(grouped);
    setReportData(chartData);
    setShow(true);
  };

  const fetchReport = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/api/higherStudies/generate-exam-report"
      );
      setOriginalData(res.data);
    } catch (err) {
      console.error("Error fetching exam report", err);
    }
  };

  useEffect(() => {
    fetchReport();
  }, []);

  const yearOptions = Array.from(
    new Set([...originalData.map((item) => item.passedOutYear)])
  )
    .sort((a, b) => a - b)
    .filter((year) => {
      // Ensure year is a valid number and within a reasonable range
      const yearNum = Number(year);
      return (
        !isNaN(yearNum) &&
        yearNum >= 2010 &&
        yearNum <= 2025 &&
        String(yearNum).length === 4
      );
    })
    .sort((a, b) => a - b);

  const allYears = Array.from(
    new Set(Object.values(groupedData).flatMap((exam) => Object.keys(exam)))
  ).sort((a, b) => b - a);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom color="maroon">
        Competitive Exam Report (Year-wise)
      </Typography>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel id="from-year-label">From Year</InputLabel>
          <Select
            labelId="from-year-label"
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

        <FormControl sx={{ minWidth: 150 }}>
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
          color="secondary"
          onClick={handleGenerateReport}
          sx={{ alignSelf: "center" }}
        >
          Generate Report
        </Button>
      </div>

      {show && (
        <>
          <TableContainer component={Paper} sx={{ my: 4 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Exam Type</strong>
                  </TableCell>
                  {allYears.map((year) => (
                    <TableCell
                      key={year}
                      onClick={() => handleYearClick(year)}
                      style={{ cursor: "pointer", color: "blue" }}
                    >
                      <strong>
                        {year - 1} - {year}
                      </strong>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Object.entries(groupedData).map(([examType, yearData]) => (
                  <TableRow key={examType}>
                    <TableCell>{examType}</TableCell>
                    {allYears.map((year) => (
                      <TableCell key={year}>{yearData[year] || ""}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Typography variant="h6" gutterBottom>
            Students Registered for Exams (by Year)
          </Typography>

          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.keys(groupedData).map((examType, idx) => (
                <Bar
                  key={examType}
                  dataKey={examType}
                  fill={`hsl(${(idx * 60) % 360}, 70%, 50%)`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>

          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            fullWidth
            maxWidth="lg"
          >
            <DialogTitle>
              Detailed Report - {selectedYear}
              <IconButton
                aria-label="close"
                onClick={() => setOpenModal(false)}
                style={{ position: "absolute", right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Name</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Roll No</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Branch</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Mobile Number</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Email Address</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Passed Out Year</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Exam Type</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Registration Number</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Score</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {detailedData.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.rollNo}</TableCell>
                        <TableCell>{item.branch}</TableCell>
                        <TableCell>{item.mobileNo}</TableCell>
                        <TableCell>{item.email}</TableCell>
                        <TableCell>{item.passedOutYear}</TableCell>
                        <TableCell>{item.examType}</TableCell>
                        <TableCell>{item.registrationNo}</TableCell>
                        <TableCell>{item.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default ExamReport;
