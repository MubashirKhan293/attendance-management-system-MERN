import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/MarkAttendance.css'; // Import the CSS file
import Navbar from './Navbar';

const MarkAttendance = () => {
  const [attendance, setAttendance] = useState({
    name: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    status: 'Present',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user data from localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setAttendance((prevAttendance) => ({
        ...prevAttendance,
        name: user.username,
        email: user.email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    setAttendance({ ...attendance, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, email, date, status } = attendance;
      const response = await axios.post('http://localhost:5000/mark-attendance', { name, email, date, status });
      console.log(response.data);
      setMessage('Attendance submitted successfully!');
      setError('');
      // Optionally, reset the form
      setAttendance({
        name: '',
        email: '',
        date: new Date().toISOString().split('T')[0],
        status: 'Present',
      });
    } catch (error) {
      console.error(error);
      setMessage('');
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to submit attendance. Please try again.');
      }
    }
  };

  return (
    <div className="mark-attendance">
      <Navbar/>
      <h2>Mark Attendance</h2>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={attendance.name}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={attendance.email}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={attendance.date}
            onChange={handleChange}
            readOnly
          />
        </div>
        <div>
          <label htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={attendance.status}
            onChange={handleChange}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <button type="submit">Submit Attendance</button>
      </form>
    </div>
  );
};

export default MarkAttendance;
