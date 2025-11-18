// Student operations controller
const studentService = require('../services/studentService');
const logger = require('../utils/logger');

class StudentController {
  // Get student dashboard data
  async getDashboard(req, res) {
    try {
      const token = req.query.token || req.body.token;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token required'
        });
      }

      const dashboardData = await studentService.getStudentDashboard(token);
      
      res.status(200).json({
        success: true,
        data: dashboardData,
        message: 'Dashboard data retrieved successfully'
      });

    } catch (error) {
      logger.error('Get dashboard error:', error.message);
      
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve dashboard data'
      });
    }
  }

  // Get student grades
  async getGrades(req, res) {
    try {
      const token = req.query.token || req.body.token;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token required'
        });
      }

      const grades = await studentService.getGrades(token);
      
      res.status(200).json({
        success: true,
        data: grades,
        message: 'Grades retrieved successfully'
      });

    } catch (error) {
      logger.error('Get grades error:', error.message);
      
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve grades'
      });
    }
  }

  // Get student schedule
  async getSchedule(req, res) {
    try {
      const token = req.query.token || req.body.token;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token required'
        });
      }

      const schedule = await studentService.getSchedule(token);
      
      res.status(200).json({
        success: true,
        data: schedule,
        message: 'Schedule retrieved successfully'
      });

    } catch (error) {
      logger.error('Get schedule error:', error.message);
      
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve schedule'
      });
    }
  }
}

module.exports = new StudentController();