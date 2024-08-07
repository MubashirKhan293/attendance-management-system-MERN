const express = require('express');
const router = express.Router();
const auth_controllers = require('../controllers/auth-controllers');
const admin_controllers = require('../controllers/admin-controllers');
const { auth, adminAuth } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.route('/home').get(auth_controllers.home);
router.route('/signup').post(auth_controllers.register);
router.route('/login').post(auth_controllers.login);
router.route('/profile').put(auth, upload.single('avatar'), auth_controllers.updateProfile);
router.route('/mark-attendance').post(auth_controllers.markAttendance);
router.route('/attendance').get(auth, auth_controllers.fetchUserAttendance);
router.route('/submit-leave').post(auth, auth_controllers.submitLeaveRequest);

// Admin routes
router.get('/leave-requests', auth, adminAuth, admin_controllers.getAllLeaveRequests);
router.patch('/leave-requests/:id', auth, adminAuth, admin_controllers.updateLeaveRequestStatus);
router.get('/get-attendance', auth, adminAuth, admin_controllers.getAllUserAttendance)
router.get('/attendance', auth,adminAuth, admin_controllers.getAllAttendance);
router.post('/attendance', auth,adminAuth, admin_controllers.createAttendance);
router.patch('/attendance/:id', auth,adminAuth, admin_controllers.updateAttendance);
router.delete('/attendance/:id', auth,adminAuth, admin_controllers.deleteAttendance);

module.exports = router;
