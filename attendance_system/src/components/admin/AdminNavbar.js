import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Navbar.css';
import appLogo from '../../images/web_logo.png';

function AdminNavbar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <img src={appLogo} alt="App Logo" className="app-logo" />
        <h1 className="app-title">Attendance App</h1>
      </div>
      <ul>
        <li><Link to="/admin-dashboard">Dashboard</Link></li>
        <li><Link to="/get-attendance">View Attendance</Link></li>
        <li><Link to="/leave-requests">Leave Requests</Link></li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
