// Authentication controller
const authService = require('../services/authService');
const logger = require('../utils/logger');
const constants = require('../utils/constants');

class AuthController {
  // Handle user login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      logger.info(`Login attempt for user: ${username}`);
      
      const result = await authService.authenticate({ username, password });
      
      res.status(constants.STATUS_CODES.SUCCESS).json({
        success: true,
        token: result.token,
        username: result.username,
        message: result.message
      });

    } catch (error) {
      logger.error('Login error:', error.message);
      
      res.status(constants.STATUS_CODES.UNAUTHORIZED).json({
        success: false,
        message: error.message || constants.ERRORS.AUTH_FAILED
      });
    }
  }

  // Handle user logout
  async logout(req, res) {
    try {
      const token = req.query.token || req.body.token;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token required for logout'
        });
      }

      const result = authService.logout(token);
      
      res.status(constants.STATUS_CODES.SUCCESS).json(result);

    } catch (error) {
      logger.error('Logout error:', error.message);
      
      res.status(constants.STATUS_CODES.SERVER_ERROR).json({
        success: false,
        message: 'Logout failed'
      });
    }
  }

  // Verify session token
  async verify(req, res) {
    try {
      const token = req.query.token || req.body.token;
      
      if (!token) {
        return res.status(400).json({
          success: false,
          message: 'Token required for verification'
        });
      }

      const result = authService.verifySession(token);
      
      res.status(constants.STATUS_CODES.SUCCESS).json({
        success: result.valid,
        message: result.message,
        username: result.valid ? result.username : undefined
      });

    } catch (error) {
      logger.error('Verification error:', error.message);
      
      res.status(constants.STATUS_CODES.SERVER_ERROR).json({
        success: false,
        message: 'Verification failed'
      });
    }
  }

  // Get system status
  async status(req, res) {
    try {
      const activeSessions = authService.getActiveSessions();
      
      res.status(constants.STATUS_CODES.SUCCESS).json({
        success: true,
        status: 'online',
        activeSessions,
        timestamp: new Date().toISOString()
      });

    } catch (error) {
      logger.error('Status check error:', error.message);
      
      res.status(constants.STATUS_CODES.SERVER_ERROR).json({
        success: false,
        message: 'Status check failed'
      });
    }
  }
}

module.exports = new AuthController();