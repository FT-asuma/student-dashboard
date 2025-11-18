// Application constants and error messages
module.exports = {
  // Error messages
  ERRORS: {
    MISSING_CREDENTIALS: 'Username and password are required',
    AUTH_FAILED: 'Authentication failed',
    SESSION_EXPIRED: 'Session expired',
    RATE_LIMITED: 'Too many login attempts',
    INVALID_TOKEN: 'Invalid session token',
    BROWSER_ERROR: 'Browser automation error occurred'
  },
  
  // API endpoints
  ENDPOINTS: {
    LOGIN: '/api/login',
    LOGOUT: '/api/logout',
    VERIFY: '/api/verify'
  },
  
  // Response status codes
  STATUS_CODES: {
    SUCCESS: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    TOO_MANY_REQUESTS: 429,
    SERVER_ERROR: 500
  }
};