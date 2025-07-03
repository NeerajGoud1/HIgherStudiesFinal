import React from "react";
import "../App.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  boxStyle,
  containerStyle,
  headingStyle,
  boxesWrapperStyle,
} from "./Styles";
import DashboardLayout from "../components/DashboardLayout";
import "../styles/Dashboard.css";

const pageVariants = {
  initial: { x: "100%", opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

const FacultyPage = ({ setIsAuthenticated, setUserType }) => {
  return (
    <DashboardLayout
      userType="faculty"
      setIsAuthenticated={setIsAuthenticated}
      setUserType={setUserType}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
      >
        <h1>Faculty Dashboard</h1>
        <div className="dashboard-stats">
          <div className="stat-card">
            <h3>Competitive Exams</h3>
            <p className="stat-number">45</p>
            <p className="stat-label">Student Registrations</p>
          </div>
          <div className="stat-card">
            <h3>Higher Studies</h3>
            <p className="stat-number">25</p>
            <p className="stat-label">Applications</p>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            <p className="stat-number">150</p>
            <p className="stat-label">Active Students</p>
          </div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default FacultyPage;
