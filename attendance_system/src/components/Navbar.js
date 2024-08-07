import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import appLogo from '../images/web_logo.png';

function Navbar() {
  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <img src={appLogo} alt="App Logo" className="app-logo" />
        <h1 className="app-title">Attendance App</h1>
      </div>
      <ul>
        <li><Link to="/">Dashboard</Link></li>
        <li><Link to="/view-attendance">Attendance Records</Link></li>
        <li><Link to="/mark-attendance">Mark Attendance</Link></li>
        <li><Link to="/mark-leave">Leave</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
