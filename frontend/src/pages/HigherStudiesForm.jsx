import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import FormHeader from "../components/FormHeader";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import File from "../components/File";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
export default function HigherStudiesForm() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    mobileNo: "",
    email: "",
    joiningInstituteName: "",
    yearOfAdmission: "",
    passedOutYear: "",
    course: "",
    customCourse: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUnSuccessAltert, setShowUnSuccessAltert] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "course") {
      setFormData((prev) => ({
        ...prev,
        course: value,
        customCourse: value === "other" ? prev.customCourse : "",
      }));
    } else if (name === "customCourse") {
      setFormData((prev) => ({
        ...prev,
        customCourse: value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "mobileNo" ? String(value) : value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let res = null;
    try {
      const response = await axios.post(
        "http://localhost:8080/api/higherStudies/store",
        { ...formData }
      );
      res = response;
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        setResMsg(response.data.message);
        setShowSuccessAlert(true);
        setTimeout(() => setShowSuccessAlert(false), 3000);
      } else if (response.status === 226) {
        setResMsg(response.data.message);
        setShowUnSuccessAltert(true);
        setTimeout(() => setShowUnSuccessAltert(false), 3000);
      }
      setFormData({
        name: "",
        rollNo: "",
        branch: "",
        mobileNo: "",
        email: "",
        joiningInstituteName: "",
        yearOfAdmission: "",
        passedOutYear: "",
        course: "",
        customCourse: "",
      });
    } catch (error) {
      setResMsg(res.data.message);
      setShowUnSuccessAltert(true);
      setTimeout(() => setShowUnSuccessAltert(false), 3000);
    }
  };

  return (
    <div>
      <FormHeader />
      <Box
        sx={{
          backgroundColor: "#fff",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
        }}
      >
        <Container maxWidth="sm" sx={{ mt: 1 }}>
          {/* Success Alert */}
          <Slide
            direction="down"
            in={showSuccessAlert}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                position: "fixed",
                top: 20,
                left: "40%",
                transform: "translateX(-50%)",
                zIndex: 9999,
              }}
            >
              <Alert variant="filled" severity="success">
                Data Submited Successfully
              </Alert>
            </Box>
          </Slide>

          {/* Warning Alert */}
          <Slide
            direction="down"
            in={showUnSuccessAltert}
            mountOnEnter
            unmountOnExit
          >
            <Box
              sx={{
                position: "fixed",
                top: 20,
                left: "40%",
                transform: "translateX(-50%)",
                zIndex: 9999,
              }}
            >
              <Alert variant="filled" severity="warning">
                {resMsg}
              </Alert>
            </Box>
          </Slide>

          {/* Form Title */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "maroon",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              fontWeight: 600,
              textAlign: "center",
              mb: 3,
            }}
            className="font"
          >
            Student Higher Studies Form
          </Typography>

          {/* Form Box */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              backgroundColor: "#fafafa",
              padding: 4,
              borderRadius: 3,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
            className="formstyle"
          >
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Roll Number"
              name="rollNo"
              value={formData.rollNo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Branch"
              name="branch"
              value={formData.branch}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Mobile Number"
              name="mobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Passed Out Year"
              name="passedOutYear"
              type="number"
              value={formData.passedOutYear}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="New Institute Name"
              name="joiningInstituteName"
              value={formData.joiningInstituteName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Joining Year Of New Institute"
              name="yearOfAdmission"
              type="number"
              value={formData.yearOfAdmission}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <FormControl size="small" fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-select-small-label" sx={{ mt: 1 }}>
                Specialization
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={formData.course}
                label="Specialization"
                name="course"
                onChange={handleChange}
                fullWidth
                sx={{ height: 53 }}
              >
                <MenuItem value="Mtech">MTech</MenuItem>
                <MenuItem value="MBA">MBA</MenuItem>
                <MenuItem value="MSC">MSS</MenuItem>
                <MenuItem value="PHD">TOEFL</MenuItem>
                <MenuItem value="MS">DUOLINGO</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            {formData.course === "other" && (
              <TextField
                label="Enter other specialization"
                name="customCourse"
                type="text"
                value={formData.customCourse}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required={formData.course === "other"} // Only make this required when "other" is selected
                sx={{ mt: 3 }}
              />
            )}
            <File />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                backgroundColor: "maroon",
                "&:hover": { backgroundColor: "#800000" },
                fontWeight: 600,
              }}
            >
              Submit
            </Button>
          </Box>
        </Container>
      </Box>
    </div>
  );
}
