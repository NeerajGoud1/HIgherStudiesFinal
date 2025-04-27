import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import HigherStudiesForm from "./pages/HigherStudiesForm";
import { Routes, Route, BrowserRouter as Router, Navigate } from "react-router-dom";
import ExamForm from "./pages/EaxmForm";
import StudentPage from "./pages/StudentPage";
import HigherStudiesReport from "./pages/HigherStudiesReport";
import ExamReport from "./pages/ExamReport";
import FacultyPage from "./pages/FacultyPage";
import { AnimatePresence } from "framer-motion";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserType = localStorage.getItem('userType');
    if (token) {
      setIsAuthenticated(true);
      setUserType(storedUserType);
    }
  }, []);

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <AnimatePresence mode="wait">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to={`/${userType}`} replace /> : 
                <Login setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
            } 
          />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <StudentPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/faculty"
            element={
              <ProtectedRoute>
                <FacultyPage setIsAuthenticated={setIsAuthenticated} setUserType={setUserType} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/study-details"
            element={
              <ProtectedRoute>
                <HigherStudiesForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/exam-details"
            element={
              <ProtectedRoute>
                <ExamForm />
              </ProtectedRoute>
            }
          />

          <Route
            path="/heigherStudies-report"
            element={
              <ProtectedRoute>
                <HigherStudiesReport />
              </ProtectedRoute>
            }
          />

          <Route
            path="/exam-report"
            element={
              <ProtectedRoute>
                <ExamReport />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Router>
  );
}

export default App;
