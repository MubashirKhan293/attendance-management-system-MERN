import axios from 'axios';

export const submitLeaveRequest = async (leaveDetails) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/submit-leave', leaveDetails, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting leave request:', error);
    return { success: false, message: 'Failed to submit leave request' };
  }
};
