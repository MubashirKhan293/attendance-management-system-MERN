import React, { useState } from 'react';
import { submitLeaveRequest } from '../api/leaveApi';
import '../styles/MarkLeave.css';
import Navbar from './Navbar';

function MarkLeave() {
  const [leaveDetails, setLeaveDetails] = useState({ reason: '', date: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLeaveDetails({ ...leaveDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await submitLeaveRequest(leaveDetails);
    if (response.success) {
      setSubmitted(true);
    } else {
      // Handle error
      alert(response.message);
    }
  };

  return (
    <div className="mark-leave">
      <Navbar />
      <h1>Mark Leave</h1>
      {submitted ? (
        <p>Leave request submitted!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reason">Reason</label>
            <textarea 
              id="reason" 
              name="reason" 
              value={leaveDetails.reason} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={leaveDetails.date} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )}
    </div>
  );
}

export default MarkLeave;
