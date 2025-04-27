import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpg";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import {
  boxStyle,
  containerStyle,
  headingStyle,
  boxesWrapperStyle,
} from "./Styles";
import DashboardLayout from '../components/DashboardLayout';
import '../styles/Dashboard.css';

const pageVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const StudentPage = ({ setIsAuthenticated, setUserType }) => {
  return (
    <DashboardLayout 
      userType="student"
      setIsAuthenticated={setIsAuthenticated}
      setUserType={setUserType}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h1>Student Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Competitive Exams</h3>
            <p className="stat-number">3</p>
            <p className="stat-label">Registered Exams</p>
          </div>
          <div className="stat-card">
            <h3>Higher Studies</h3>
            <p className="stat-number">5</p>
            <p className="stat-label">Applications</p>
          </div>
          <div className="stat-card">
            <h3>Upcoming Deadlines</h3>
            <p className="stat-number">2</p>
            <p className="stat-label">This Week</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default StudentPage;
