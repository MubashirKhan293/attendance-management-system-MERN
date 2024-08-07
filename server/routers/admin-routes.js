const express = require('express');
const router = express.Router();
const { auth, adminAuth } = require('../middleware/auth');
const leaveControllers = require('../controllers/admin-controllers');

router.get('/leave-requests', auth, adminAuth, leaveControllers.getAllLeaveRequests);
router.patch('/leave-requests/:id', auth, adminAuth, leaveControllers.updateLeaveRequestStatus);

module.exports = router;
