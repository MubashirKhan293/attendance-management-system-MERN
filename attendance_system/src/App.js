import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/admin/AdminDashboard';
import MarkAttendance from './components/MarkAttendance';
import MarkLeave from './components/MarkLeave';
import ViewAttendance from './components/ViewAttendance';
import EditProfile from './components/EditProfile';
import LeaveRequests from './components/admin/LeaveRequests';
import AllAttendance from './components/admin/AllAttendance';

const PrivateRoute = ({ element, ...rest }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const AdminRoute = ({ element, ...rest }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  return isAuthenticated && isAdmin ? element : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute element={<Dashboard />} />} />
          <Route path="/mark-attendance" element={<PrivateRoute element={<MarkAttendance />} />} />
          <Route path="/mark-leave" element={<PrivateRoute element={<MarkLeave />} />} />
          <Route path="/view-attendance" element={<PrivateRoute element={<ViewAttendance />} />} />
          <Route path="/edit-profile" element={<PrivateRoute element={<EditProfile />} />} />
          <Route path="/admin-dashboard" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path="/leave-requests" element={<LeaveRequests />} />
          <Route path="/get-attendance" element={<AllAttendance />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
