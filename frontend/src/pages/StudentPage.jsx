import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import {
  boxStyle,
  containerStyle,
  headingStyle,
  boxesWrapperStyle,
} from "./Styles";

const pageVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};
const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userType");

  setIsAuthenticated(false);
  setUserType(null);

  navigate("/login", { replace: true });
};

const StudentPage = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <AppBar position="static" sx={{ backgroundColor: "#B82132 " }}>
        <div className="Studentbtns">
          <div>
            <h3>VNRVJIET</h3>
          </div>
          <div className="btngrp">
            <div>
              <Link className="btn" to="/" role="button">
                Home
              </Link>
            </div>
            <div>
              <Link onClick={handleLogout} className="btn">
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </AppBar>
      <Box>
        <div style={containerStyle}>
          <h1 style={headingStyle}>Select the option to enter details!</h1>
          <div style={boxesWrapperStyle}>
            <Link style={boxStyle} to="/study-details" className="miniBox">
              Higher Studies
            </Link>
            <Link style={boxStyle} className="miniBox" to="/exam-details">
              Competitive Exam
            </Link>
          </div>
        </div>
      </Box>
    </motion.div>
  );
};

export default StudentPage;
