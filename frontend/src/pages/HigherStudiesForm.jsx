import { Box, Container, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import "../App.css";
import FormHeader from "../components/FormHeader";
import * as React from "react";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import File from "../components/File";

export default function HigherStudiesForm() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    mobileNo: "",
    email: "",
    passedOutYear: "",
    joiningInstituteName: "",
    yearOfAdmission: "",
    course: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUnSuccessAltert, setShowUnSuccessAltert] = useState(false);
  const [resMsg, setResMsg] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        passedOutYear: "",
        joiningInstituteName: "",
        yearOfAdmission: "",
        course: "",
      });
    } catch (error) {
      setResMsg(res?.data?.message || "Error submitting form");
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
                Data Submitted Successfully
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
              label="Email"
              name="email"
              type="email"
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
              label="Joining Institute Name"
              name="joiningInstituteName"
              value={formData.joiningInstituteName}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Year of Admission"
              name="yearOfAdmission"
              type="number"
              value={formData.yearOfAdmission}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />
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
