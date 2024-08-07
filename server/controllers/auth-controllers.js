const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../models/user-models");
const Attendance = require('../models/attendance-models');
const Leave = require('../models/leave-models');

const home = async (req, res) => {
  try {
    res.status(200).send("Hello, It's home page with controller...");
  } catch (error) {
    res.status(400).send({ msg: "Page Not Load" });
  }
};

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      return res.status(400).json({ message: 'User Already Existed...' });
    }

    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      email,
      password: hash_password,
      isAdmin: false // By default, isAdmin is false
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar, // assuming you have an avatar field
        isAdmin: newUser.isAdmin
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'User registration failed' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(200).json({
      token,
      user: {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isAdmin: user.isAdmin // Include isAdmin in the response
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const avatar = req.file ? req.file.path.replace(/\\/g, "/") : undefined; // Use forward slashes for URLs

    const updateData = { username, email };
    if (avatar) {
      updateData.avatar = avatar;
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.id, updateData, { new: true });

    res.status(200).json({ message: 'Profile updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const markAttendance = async (req, res) => {
  try {
    const { name, email, date, status } = req.body; // Assuming these are the fields sent from the frontend

    // Check if attendance already exists for the user on the given date
    const existingAttendance = await Attendance.findOne({ email, date });
    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for today' });
    }

    // Create new attendance entry
    const newAttendance = new Attendance({
      name,
      email,
      date,
      status,
    });

    // Save attendance entry to the database
    await newAttendance.save();

    res.status(201).json({ message: 'Attendance marked successfully', attendance: newAttendance });
  } catch (error) {
    console.error('Error marking attendance:', error);
    res.status(500).json({ message: 'Failed to mark attendance' });
  }
};

const fetchUserAttendance = async (req, res) => {
  try {
    const { email } = req.query; // Get email from query params
    const { page = 1, limit = 10 } = req.query; // Pagination parameters

    const attendanceRecords = await Attendance.find({ email })
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    res.status(200).json({ success: true, records: attendanceRecords });
  } catch (error) {
    console.error('Error fetching attendance records:', error);
    res.status(500).json({ message: 'Failed to fetch attendance records' });
  }
};

const submitLeaveRequest = async (req, res) => {
  try {
    const { reason, date } = req.body;
    const user = req.user;

    const newLeave = new Leave({
      userId: user._id,
      username: user.username,
      email: user.email,
      reason,
      date
    });

    await newLeave.save();
    res.status(201).json({ success: true, message: 'Leave request submitted successfully', leave: newLeave });
  } catch (error) {
    console.error('Error submitting leave request:', error);
    res.status(500).json({ message: 'Failed to submit leave request' });
  }
};

module.exports = { home, register, login, updateProfile, markAttendance, fetchUserAttendance, submitLeaveRequest };
