import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/AllAttendance.css';
import AdminNavbar from './AdminNavbar';

const AllAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [newRecord, setNewRecord] = useState({ email: '', name: '', date: '', status: '' });
  const [editingId, setEditingId] = useState(null);
  const [editingRecord, setEditingRecord] = useState({ email: '', name: '', date: '', status: '' });

  useEffect(() => {
    const fetchAllAttendance = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/get-attendance', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance records:', error);
      }
    };

    fetchAllAttendance();
  }, []);

  const handleCreate = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/attendance', newRecord, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance([...attendance, response.data]);
      setNewRecord({ email: '', name: '', date: '', status: '' });
    } catch (error) {
      console.error('Error creating attendance record:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(`http://localhost:5000/attendance/${id}`, editingRecord, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance(attendance.map(record => (record._id === id ? response.data : record)));
      setEditingId(null);
      setEditingRecord({ email: '', name: '', date: '', status: '' });
    } catch (error) {
      console.error('Error updating attendance record:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/attendance/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendance(attendance.filter(record => record._id !== id));
    } catch (error) {
      console.error('Error deleting attendance record:', error);
    }
  };

  return (
    <div className="leave-requests-container">
      <AdminNavbar />
      <h2>Students Attendance Record</h2>
      <table className="leave-requests-table">
        <thead>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map(record => (
            <tr key={record._id}>
              <td>{record.email}</td>
              <td>{record.name}</td>
              <td>{record.date}</td>
              <td>{record.status}</td>
              <td>
                <button onClick={() => { setEditingId(record._id); setEditingRecord(record); }} className="btn btn-edit">Edit</button>
                <button onClick={() => handleDelete(record._id)} className="btn btn-delete">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editingId ? (
        <div>
          <h3>Edit Attendance Record</h3>
          <input
            type="text"
            value={editingRecord.email}
            onChange={e => setEditingRecord({ ...editingRecord, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={editingRecord.name}
            onChange={e => setEditingRecord({ ...editingRecord, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="date"
            value={editingRecord.date}
            onChange={e => setEditingRecord({ ...editingRecord, date: e.target.value })}
            placeholder="Date"
          />
          <input
            type="text"
            value={editingRecord.status}
            onChange={e => setEditingRecord({ ...editingRecord, status: e.target.value })}
            placeholder="Status"
          />
          <button onClick={() => handleUpdate(editingId)} className="btn btn-update">Update</button>
          <button onClick={() => setEditingId(null)} className="btn btn-cancel">Cancel</button>
        </div>
      ) : (
        <div>
          <h3>Add New Attendance Record</h3>
          <input
            type="text"
            value={newRecord.email}
            onChange={e => setNewRecord({ ...newRecord, email: e.target.value })}
            placeholder="Email"
          />
          <input
            type="text"
            value={newRecord.name}
            onChange={e => setNewRecord({ ...newRecord, name: e.target.value })}
            placeholder="Name"
          />
          <input
            type="date"
            value={newRecord.date}
            onChange={e => setNewRecord({ ...newRecord, date: e.target.value })}
            placeholder="Date"
          />
          <input
            type="text"
            value={newRecord.status}
            onChange={e => setNewRecord({ ...newRecord, status: e.target.value })}
            placeholder="Status"
          />
          <button onClick={handleCreate} className="btn btn-create">Create</button>
        </div>
      )}
    </div>
  );
};

export default AllAttendance;
