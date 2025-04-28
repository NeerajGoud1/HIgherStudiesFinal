import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../styles/DashboardLayout.css";

const DashboardLayout = ({
  children,
  userType,
  setIsAuthenticated,
  setUserType,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getMenuItems = () => {
    if (userType === "student") {
      return [
        { path: "/student", label: "Dashboard", icon: "📊" },
        { path: "/exam-details", label: "Competitive Exams", icon: "📝" },
        { path: "/study-details", label: "Higher Studies", icon: "🎓" },
      ];
    }
    return [
      { path: "/faculty", label: "Dashboard", icon: "📊" },
      { path: "/exam-report", label: "Competitive Exam Report", icon: "📋" },
      {
        path: "/heigherStudies-report",
        label: "Higher Studies Report",
        icon: "📈",
      },
    ];
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsAuthenticated(false);
    setUserType(null);
    navigate("/login", { replace: true });
  };

  const menuItems = getMenuItems();

  return (
    <div className="dashboard-container">
      {/* Hamburger button */}
      <div className="mobile-header">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          &#9776;
        </button>
        <h2>Higher Studies Portal</h2>
      </div>

      {/* Sidebar */}

      <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="mobile-close">
          <button onClick={closeSidebar} className="close-btn">
            ✖️
          </button>
        </div>
        <div className="logo">
          <h2>Higher Studies Portal</h2>
          <p className="user-type">
            {userType === "student" ? "Student Portal" : "Faculty Portal"}
          </p>
        </div>

        <nav className="nav-menu">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false); // Close sidebar after clicking on mobile
              }}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
        </nav>

        <div className="logout-section">
          <button
            className="logout-button"
            onClick={handleLogout}
            title="Click to logout"
          >
            <span className="icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </div>

      <div className="main-content">{children}</div>
    </div>
  );
};

export default DashboardLayout;
