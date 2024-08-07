import axios from 'axios';

export const fetchAttendanceRecords = async (email, page) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/attendance', {
      params: { email, page },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.records; // Access the records key in the response
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    return [];
  }
};
