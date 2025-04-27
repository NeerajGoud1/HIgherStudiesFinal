import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="home-overlay">
        <motion.div 
          className="home-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>Higher Studies Portal</h1>
          <p className="subtitle">Your gateway to academic excellence and future opportunities</p>
          
          <div className="features">
            <div className="feature-item">
              <span className="feature-icon">🎓</span>
              <h3>Track Your Progress</h3>
              <p>Monitor your academic journey and achievements</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📚</span>
              <h3>Manage Applications</h3>
              <p>Handle higher education applications efficiently</p>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <h3>View Reports</h3>
              <p>Access detailed reports and analytics</p>
            </div>
          </div>

          <div className="auth-buttons">
            <motion.button 
              className="auth-btn login-btn"
              onClick={() => navigate('/login')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign In
            </motion.button>
            <motion.button 
              className="auth-btn register-btn"
              onClick={() => navigate('/register')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Up
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
