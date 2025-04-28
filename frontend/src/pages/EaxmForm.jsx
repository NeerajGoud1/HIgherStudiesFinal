import { useState } from "react";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "../App.css";
import Alert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";
import FormHeader from "../components/FormHeader";
import File from "../components/File";
import { Box } from "@mui/material";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function ExamForm() {
  const [formData, setFormData] = useState({
    name: "",
    rollNo: "",
    branch: "",
    mobileNo: "",
    email: "",
    passedOutYear: "",
    examType: "", // Exam type (GATE, GRE, etc.)
    customExam: "", // For custom exam if "Other" is selected
    registrationNo: "",
    score: "",
  });
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showUnSuccessAlert, setUnShowSuccessAlert] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "exam") {
      setFormData((prev) => ({
        ...prev,
        examType: value,
        customExam: value === "other" ? prev.customExam : "",
      }));
    } else if (name === "customExam") {
      setFormData((prev) => ({
        ...prev,
        customExam: value,
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
    try {
      const response = await axios.post(
        "http://localhost:8080/api/higherStudies/storeExamData",
        { ...formData }
      );
      console.log(response);

      if (response.status === 200 || response.status === 201) {
        setShowSuccessAlert(true);
        setFormData({
          name: "",
          rollNo: "",
          branch: "",
          mobileNo: "",
          email: "",
          passedOutYear: "",
          examType: "",
          registrationNo: "",
          score: "",
          customExam: "",
        });
        setTimeout(() => setShowSuccessAlert(false), 3000);
      } else {
        setUnShowSuccessAlert(true);
        setTimeout(() => setUnShowSuccessAlert(false), 3000);
      }
    } catch (error) {
      setUnShowSuccessAlert(true);
      setTimeout(() => setUnShowSuccessAlert(false), 3000);
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
                Data Submitted Successfully!
              </Alert>
            </Box>
          </Slide>

          {/* Error Alert */}
          <Slide
            direction="down"
            in={showUnSuccessAlert}
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
              <Alert variant="filled" severity="error">
                Error In Submitting Data!
              </Alert>
            </Box>
          </Slide>

          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: "maroon",
              whiteSpace: "nowrap",
              overflowX: "auto",
              textOverflow: "ellipsis",
              fontWeight: 600,
              textAlign: "center",
              mb: 3,
            }}
            className="font"
          >
            Student Competitive Exam Form
          </Typography>

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
              value={formData.passedOutYear}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
            />

            <FormControl size="small" fullWidth sx={{ mt: 2 }}>
              <InputLabel id="demo-select-small-label" sx={{ mt: 1 }}>
                Exam Type
              </InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={formData.examType}
                label="Exam Type"
                name="exam"
                onChange={handleChange}
                fullWidth
                sx={{ height: 53 }}
              >
                <MenuItem value="GATE">GATE</MenuItem>
                <MenuItem value="GRE">GRE</MenuItem>
                <MenuItem value="IELTS">IELTS</MenuItem>
                <MenuItem value="TOEFL">TOEFL</MenuItem>
                <MenuItem value="DUOLINGO">DUOLINGO</MenuItem>
                <MenuItem value="PTE">PTE</MenuItem>
                <MenuItem value="MAT">MAT</MenuItem>
                <MenuItem value="CAT">CAT</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            {formData.examType === "other" && (
              <TextField
                label="Enter other exam type"
                name="customExam"
                type="text"
                value={formData.customExam}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required={formData.examType === "other"} // Only make this required when "other" is selected
                sx={{ mt: 3 }}
              />
            )}

            <TextField
              label={`Registration Number ${formData.examType} Exam`}
              name="registrationNo"
              type="text"
              value={formData.registrationNo}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              sx={{ mt: 3 }}
            />
            <TextField
              label="Score Obtained"
              name="score"
              value={formData.score}
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
