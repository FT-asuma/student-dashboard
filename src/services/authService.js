// Authentication business logic service
const puppeteerService = require('./puppeteerService');
const sessionManager = require('./sessionManager');
const helpers = require('../utils/helpers');
const logger = require('../utils/logger');
const constants = require('../utils/constants');

class AuthService {
  constructor() {
    // Login attempt tracking
    this.loginAttempts = new Map();
    this.sessionCleanupInterval = setInterval(() => {
      sessionManager.cleanExpiredSessions();
    }, 300000); // Clean every 5 minutes
  }

  // Main authentication method
  async authenticate({ username, password }) {
    // Validate input
    const validation = helpers.validateInput({ username, password });
    if (!validation.valid) {
      throw new Error(validation.message);
    }

    // Check rate limiting
    if (this.isRateLimited(username)) {
      throw new Error(constants.ERRORS.RATE_LIMITED);
    }

    try {
      // Perform puppeteer authentication
      const { browser, page } = await puppeteerService.authenticate({ 
        username, 
        password 
      });

      // Create session
      const session = sessionManager.createSession({ username, browser, page });

      // Reset login attempts on successful login
      this.loginAttempts.delete(username);

      logger.info(`Authentication successful for user: ${username}`);
      return {
        success: true,
        token: session.token,
        username: session.username,
        message: 'Authentication successful'
      };

    } catch (error) {
      // Track failed login attempts
      this.trackLoginAttempt(username);
      logger.error(`Authentication failed for user ${username}:`, error.message);
      throw error;
    }
  }

  // Check if user is rate limited
  isRateLimited(username) {
    const attempts = this.loginAttempts.get(username) || { count: 0, lastAttempt: 0 };
    const now = Date.now();
    
    // Reset attempts after lockout period
    if (now - attempts.lastAttempt > process.env.LOGIN_LOCKOUT_TIME || 900000) {
      this.loginAttempts.delete(username);
      return false;
    }

    // Check if too many attempts
    return attempts.count >= (process.env.MAX_LOGIN_ATTEMPTS || 5);
  }

  // Track login attempt
  trackLoginAttempt(username) {
    const now = Date.now();
    const attempts = this.loginAttempts.get(username) || { count: 0, lastAttempt: now };
    
    attempts.count += 1;
    attempts.lastAttempt = now;
    
    this.loginAttempts.set(username, attempts);
  }

  // Verify session token
  verifySession(token) {
    const session = sessionManager.getSession(token);
    if (!session) {
      return { valid: false, message: constants.ERRORS.INVALID_TOKEN };
    }
    
    return { 
      valid: true, 
      username: session.username,
      message: 'Session is valid'
    };
  }

  // Logout user
  logout(token) {
    sessionManager.destroySession(token);
    return { success: true, message: 'Logged out successfully' };
  }

  // Get active session count
  getActiveSessions() {
    return sessionManager.getActiveSessionCount();
  }
}

module.exports = new AuthService();