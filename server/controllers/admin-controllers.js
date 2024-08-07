const Leave = require('../models/leave-models');
const attendance=require('../models/attendance-models')

const getAllLeaveRequests = async (req, res) => {
    try {
      const leaveRequests = await Leave.find();
      res.status(200).json(leaveRequests);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching leave requests' });
    }
  };

  const getAllUserAttendance= async (req, res)=>{
    try{
        const AllAttendance= await attendance.find();
        res.status(200).json(AllAttendance);
    }catch{
        res.status(500).json({message:'Error fetching attendance records'})
    }
  }
  
  const updateLeaveRequestStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const leaveRequest = await Leave.findByIdAndUpdate(id, { status }, { new: true });
  
      if (!leaveRequest) {
        return res.status(404).json({ message: 'Leave request not found' });
      }
  
      res.status(200).json({ message: 'Leave request status updated successfully', leaveRequest });
    } catch (error) {
      res.status(500).json({ message: 'Error updating leave request status' });
    }
  };

// Fetch all attendance records
const getAllAttendance = async (req, res) => {
  try {
    const attendanceRecords = await attendance.find();
    res.status(200).json(attendanceRecords);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching attendance records', error });
  }
};

// Create new attendance record
const createAttendance = async (req, res) => {
  try {
    const { email, name, date, status } = req.body;
    const newAttendance = new attendance({ email, name, date, status });
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error creating attendance record', error });
  }
};

// Update attendance record
const updateAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedAttendance = await attendance.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedAttendance);
  } catch (error) {
    res.status(500).json({ message: 'Error updating attendance record', error });
  }
};

// Delete attendance record
const deleteAttendance = async (req, res) => {
  try {
    const { id } = req.params;
    await attendance.findByIdAndDelete(id);
    res.status(200).json({ message: 'Attendance record deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting attendance record', error });
  }
};

  module.exports = {
    createAttendance,
    getAllAttendance,
    updateAttendance,
    deleteAttendance,
    getAllLeaveRequests,
    updateLeaveRequestStatus,
    getAllUserAttendance,
  };
