// Utility functions for the application
const crypto = require('crypto');
const config = require('../config/config');

module.exports = {
  // Generate secure random token
  generateToken: () => {
    return crypto.randomBytes(32).toString('hex');
  },
  
  // Validate input data
  validateInput: (data) => {
    if (!data.username || !data.password) {
      return { valid: false, message: 'Username and password are required' };
    }
    if (typeof data.username !== 'string' || typeof data.password !== 'string') {
      return { valid: false, message: 'Username and password must be strings' };
    }
    if (data.username.length < 3 || data.password.length < 6) {
      return { valid: false, message: 'Username must be at least 3 characters, password at least 6' };
    }
    return { valid: true };
  },
  
  // Check if session is expired
  isSessionExpired: (session) => {
    if (!session || !session.createdAt) return true;
    const now = Date.now();
    const sessionAge = now - new Date(session.createdAt).getTime();
    return sessionAge > config.SESSION_TIMEOUT;
  },
  
  // Clean up browser instance
  cleanupBrowser: async (browser) => {
    try {
      if (browser && browser.isConnected()) {
        await browser.close();
      }
    } catch (error) {
      console.error('Error cleaning up browser:', error.message);
    }
  }
};