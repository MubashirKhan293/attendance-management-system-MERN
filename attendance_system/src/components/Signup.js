import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/signup', form);
      setLoading(false);
      toast.success('Registration successful!');
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setTimeout(() => {
        navigate('/'); // Navigate to home page after successful registration
      }, 1000);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        toast.error(`Registration failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        toast.error('Registration failed: Network error');
      } else {
        console.error('Error:', error.message);
        toast.error(`Registration failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Signup'}
        </button>
        <p className="link-text">Already have an account? <Link to="/login">Login</Link></p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
