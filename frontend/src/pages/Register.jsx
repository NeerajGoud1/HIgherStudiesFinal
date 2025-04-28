import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student',
    college: '',
    student_id: '',
    employee_id: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-left">
          <div className="register-image-container">
            <img src="/education-illustration.svg" alt="Education" className="register-image" />
            <h1>Join Our Academic Community</h1>
            <p>Track your academic journey and plan your future education with us</p>
          </div>
        </div>

        <motion.div 
          className="register-right"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="register-form-container">
            <h2>Create Account</h2>
            {error && <div className="error-message">{error}</div>}
            
            <form onSubmit={handleSubmit}>
              <div className="user-type-toggle">
                <button 
                  type="button"
                  className={`toggle-btn ${formData.userType === 'student' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'userType', value: 'student' }})}
                >
                  Student
                </button>
                <button 
                  type="button"
                  className={`toggle-btn ${formData.userType === 'faculty' ? 'active' : ''}`}
                  onClick={() => handleChange({ target: { name: 'userType', value: 'faculty' }})}
                >
                  Faculty
                </button>
              </div>

              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>

              {formData.userType === 'student' && (
                <>
                  <div className="form-group">
                    <label>College Name</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="Enter your college name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Student ID</label>
                    <input
                      type="text"
                      name="student_id"
                      value={formData.student_id}
                      onChange={handleChange}
                      placeholder="Enter your student ID"
                      required
                    />
                  </div>
                </>
              )}

              {formData.userType === 'faculty' && (
                <>
                  <div className="form-group">
                    <label>College Name</label>
                    <input
                      type="text"
                      name="college"
                      value={formData.college}
                      onChange={handleChange}
                      placeholder="Enter your college name"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Employee ID</label>
                    <input
                      type="text"
                      name="employee_id"
                      value={formData.employee_id}
                      onChange={handleChange}
                      placeholder="Enter your employee ID"
                      required
                    />
                  </div>
                </>
              )}

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <button type="submit" className="submit-btn">
                Create Account
              </button>
            </form>

            <p className="auth-link">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Register; 