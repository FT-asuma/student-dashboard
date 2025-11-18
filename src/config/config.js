// Configuration management for the application
require('dotenv').config();

module.exports = {
  // Server configuration
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  
  // Session configuration
  SESSION_TIMEOUT: parseInt(process.env.SESSION_TIMEOUT) || 3600000, // 1 hour
  MAX_LOGIN_ATTEMPTS: parseInt(process.env.MAX_LOGIN_ATTEMPTS) || 5,
  LOGIN_LOCKOUT_TIME: parseInt(process.env.LOGIN_LOCKOUT_TIME) || 900000, // 15 minutes
  
  // Browser configuration
  BROWSER_TIMEOUT: parseInt(process.env.BROWSER_TIMEOUT) || 60000,
  
  // Puppeteer launch arguments for better performance and stability
  PUPPETEER_ARGS: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-gpu',
    '--single-process',
    '--disable-web-security',
    '--disable-features=VizDisplayCompositor'
  ]
};