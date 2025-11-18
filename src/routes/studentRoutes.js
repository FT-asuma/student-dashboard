// Student API routes
const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const authenticateToken = require('../middleware/authMiddleware');

// All student routes require authentication
router.use(authenticateToken);

// Get student dashboard
router.get('/dashboard', studentController.getDashboard);

// Get student grades
router.get('/grades', studentController.getGrades);

// Get student schedule
router.get('/schedule', studentController.getSchedule);

module.exports = router;