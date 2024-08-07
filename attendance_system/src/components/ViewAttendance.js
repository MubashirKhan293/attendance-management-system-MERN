import React, { useEffect, useState } from 'react';
import { fetchAttendanceRecords } from '../api/attendanceApi';
import '../styles/ViewAttendance.css';
import Navbar from './Navbar';

function ViewAttendance() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getRecords = async () => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        const records = await fetchAttendanceRecords(user.email, page);
        setAttendanceRecords(records);
      }
    };
    getRecords();
  }, [page]);

  return (
    <div className="view-attendance">
      <Navbar />
      <h1>View Attendance</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record._id}>
              <td>{record.name}</td>
              <td>{record.email}</td>
              <td>{new Date(record.date).toLocaleDateString()}</td>
              <td>{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <button onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

export default ViewAttendance;
