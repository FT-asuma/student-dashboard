// Authentication middleware for protected routes
const authService = require('../services/authService');
const constants = require('../utils/constants');

const authenticateToken = (req, res, next) => {
  // Get token from query parameter, body, or header
  const token = req.query.token || req.body.token || req.headers['authorization']?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token required'
    });
  }

  const result = authService.verifySession(token);
  
  if (!result.valid) {
    return res.status(401).json({
      success: false,
      message: result.message
    });
  }

  // Add user info to request object
  req.user = {
    username: result.username,
    token
  };

  next();
};

module.exports = authenticateToken;