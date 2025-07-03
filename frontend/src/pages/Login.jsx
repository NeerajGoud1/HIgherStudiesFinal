import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css";
import { ProLink } from "../ProLink";

const Login = ({ setIsAuthenticated, setUserType: setGlobalUserType }) => {
  const [userType, setUserType] = useState("student");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${ProLink}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          userType,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userType", userType);
        setIsAuthenticated(true);
        setGlobalUserType(userType);
        navigate(userType === "student" ? "/student" : "/faculty");
      } else {
        setError(
          data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Unable to connect to the server. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  // Test account credentials for easy access
  const fillTestCredentials = () => {
    setFormData({
      email: "test.student@example.com",
      password: "Test@123",
    });
    setUserType("student");
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-box">
          <h2>Welcome Back!</h2>
          <div className="user-type-toggle">
            <button
              className={`toggle-btn ${userType === "student" ? "active" : ""}`}
              onClick={() => setUserType("student")}
              type="button"
            >
              Student
            </button>
            <button
              className={`toggle-btn ${userType === "faculty" ? "active" : ""}`}
              onClick={() => setUserType("faculty")}
              type="button"
            >
              Faculty
            </button>
          </div>
          <div>
            <pre>
              Use Demo Account : Email - demo@gmail.com <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password
              - demo
            </pre>
          </div>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="submit-btn" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <div className="auth-links">
            <p className="register-link">
              Don't have an account? <Link to="/register">Register here</Link>
            </p>

            <Link to="/" className="home-link">
              <button className="home-btn" type="button">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
