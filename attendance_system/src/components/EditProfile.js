import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditProfile = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    email: '',
    avatar: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setForm(user);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setForm({
      ...form,
      avatar: e.target.files[0]
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('username', form.username);
    formData.append('email', form.email);
    formData.append('avatar', form.avatar);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('http://localhost:5000/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      setLoading(false);
      toast.success('Profile updated successfully!');
      localStorage.setItem('user', JSON.stringify(response.data.user));
      setTimeout(() => {
        navigate('/'); // Navigate to dashboard after successful update
      }, 1000);

      console.log(response.data);
    } catch (error) {
      setLoading(false);
      if (error.response) {
        console.error('Server Error:', error.response.data);
        toast.error(`Update failed: ${error.response.data.message}`);
      } else if (error.request) {
        console.error('Network Error:', error.request);
        toast.error('Update failed: Network error');
      } else {
        console.error('Error:', error.message);
        toast.error(`Update failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" value={form.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="avatar">Profile Image</label>
          <input type="file" name="avatar" onChange={handleFileChange} />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Submitting...' : 'Update'}
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default EditProfile;
