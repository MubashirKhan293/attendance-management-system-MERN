
const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
  });
  
  const Attendance = new mongoose.model("Attendance", attendanceSchema);

  module.exports = Attendance;