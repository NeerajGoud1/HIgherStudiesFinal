import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/DashboardLayout.css';

const DashboardLayout = ({ children, userType, setIsAuthenticated, setUserType }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const getMenuItems = () => {
    if (userType === 'student') {
      return [
        { path: '/student', label: 'Dashboard', icon: '📊' },
        { path: '/exam-details', label: 'Competitive Exams', icon: '📝' },
        { path: '/study-details', label: 'Higher Studies', icon: '🎓' },
      ];
    }
    return [
      { path: '/faculty', label: 'Dashboard', icon: '📊' },
      { path: '/exam-report', label: 'Competitive Exam Report', icon: '📋' },
      { path: '/heigherStudies-report', label: 'Higher Studies Report', icon: '📈' },
    ];
  };

  const handleLogout = () => {
    // Clear all auth-related data
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    
    // Update authentication state
    setIsAuthenticated(false);
    setUserType(null);

    // Navigate to login page
    navigate('/login', { replace: true });
  };

  const menuItems = getMenuItems();

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="logo">
          <h2>Higher Studies Portal</h2>
          <p className="user-type">{userType === 'student' ? 'Student Portal' : 'Faculty Portal'}</p>
        </div>
        
        <nav className="nav-menu">
          {menuItems.map((item) => (
            <div
              key={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
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

      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout; 