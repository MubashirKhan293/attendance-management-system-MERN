import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

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
      const response = await axios.post('http://localhost:5000/login', form);
      setLoading(false);
      toast.success('Login successful!');
      const { token, user } = response.data;
      login(user, token); // Set user and token in AuthContext
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      setTimeout(() => {
        if (user.isAdmin) {
          navigate('/admin-dashboard');
        } else {
          navigate('/');
        }
      }, 1000);

      console.log(response.data);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        toast.error(`Login failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        toast.error('Login failed: Network error');
      } else {
        console.error('Error:', error.message);
        toast.error(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Login'}
        </button>
        <p className="link-text">Don't have an account? <Link to="/signup">Signup</Link></p>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
