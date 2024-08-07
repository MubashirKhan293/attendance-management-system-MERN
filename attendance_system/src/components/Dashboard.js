import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import '../styles/Dashboard.css';

function Dashboard() {
  const [profileHovered, setProfileHovered] = useState(false);
  const [user, setUser] = useState({
    username: '',
    email: '',
    avatar: ''
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log(userData); // Debug: Check retrieved user data
    if (userData) {
      setUser(userData);
    }
  }, []);

  return (
    <div className="dashboard">
      <Navbar />
      <div className="main-content">
        <h1>Dashboard</h1>
        <p>Overview of user’s attendance summary.</p>
      </div>
      <div 
        className="profile-section" 
        onMouseEnter={() => setProfileHovered(true)} 
        onMouseLeave={() => setProfileHovered(false)}
      >
        <div className="profile-info">
          <span className="name_text">{user.username || 'Guest'}</span>
          {profileHovered && (
            <div className="profile-actions">
              <Link to="/edit-profile">Edit</Link>
              <button onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                window.location.href = '/login'; // Handle logout
              }}>Logout</button>
            </div>
          )}
        </div>
        <img src={user.avatar ? `http://localhost:5000/${user.avatar}` : 'https://via.placeholder.com/40'} alt="Profile" className="profile-picture" />
      </div>
    </div>
  );
}

export default Dashboard;
