// API route definitions
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const validate = require('../middleware/validationMiddleware').validate;
const { loginLimiter, apiLimiter } = require('../middleware/rateLimitMiddleware');
const authenticateToken = require('../middleware/authMiddleware');

// Apply rate limiting to all routes
router.use(apiLimiter);

// Login route - protected by login rate limiter
router.post('/login', loginLimiter, validate, authController.login);

// Logout route - requires authentication
router.post('/logout', authenticateToken, authController.logout);

// Verify token route - public access
router.post('/verify', authController.verify);

// Status route - public access
router.get('/status', authController.status);

module.exports = router;