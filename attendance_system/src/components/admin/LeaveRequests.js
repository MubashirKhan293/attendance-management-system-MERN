import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/LeaveRequests.css';
import AdminNavbar from './AdminNavbar';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/leave-requests', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLeaveRequests(response.data); // Assuming response.data is an array of leave requests
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []);

  const handleAccept = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/leave-requests/${id}`, { status: 'accepted' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaveRequests(leaveRequests.map(request => request._id === id ? { ...request, status: 'accepted' } : request));
    } catch (error) {
      console.error('Error accepting leave request:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/leave-requests/${id}`, { status: 'rejected' }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLeaveRequests(leaveRequests.map(request => request._id === id ? { ...request, status: 'rejected' } : request));
    } catch (error) {
      console.error('Error rejecting leave request:', error);
    }
  };

  return (
    <div className="leave-requests-container">
        <AdminNavbar/>
      <h2>Leave Requests</h2>
      <table className="leave-requests-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Reason</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map(request => (
            <tr key={request._id}>
              <td>{request.email}</td>
              <td>{request.reason}</td>
              <td>{request.date}</td>
              <td>{request.status}</td>
              <td>
                {request.status === "Pending" && (
                  <>
                    <button onClick={() => handleAccept(request._id)} className="btn btn-accept">Accept</button>
                    <button onClick={() => handleReject(request._id)} className="btn btn-reject">Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
