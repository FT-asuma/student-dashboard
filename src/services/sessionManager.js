// Session management service
const helpers = require('../utils/helpers');
const logger = require('../utils/logger');

class SessionManager {
  constructor() {
    this.sessions = new Map(); // Store active sessions
  }

  // Create new session
  createSession({ username, browser, page }) {
    const token = helpers.generateToken();
    const session = {
      token,
      username,
      browser,
      page,
      createdAt: new Date().toISOString(),
      lastActivity: new Date().toISOString()
    };

    this.sessions.set(token, session);
    logger.info(`Session created for user: ${username}, token: ${token}`);
    return session;
  }

  // Get session by token
  getSession(token) {
    const session = this.sessions.get(token);
    if (!session) {
      return null;
    }

    // Check if session is expired
    if (helpers.isSessionExpired(session)) {
      this.destroySession(token);
      return null;
    }

    // Update last activity
    session.lastActivity = new Date().toISOString();
    return session;
  }

  // Destroy session
  destroySession(token) {
    const session = this.sessions.get(token);
    if (session) {
      // Clean up browser instance
      helpers.cleanupBrowser(session.browser);
      this.sessions.delete(token);
      logger.info(`Session destroyed for token: ${token}`);
    }
  }

  // Clean expired sessions
  cleanExpiredSessions() {
    for (const [token, session] of this.sessions) {
      if (helpers.isSessionExpired(session)) {
        this.destroySession(token);
      }
    }
  }

  // Get all active sessions count
  getActiveSessionCount() {
    return this.sessions.size;
  }
}

module.exports = new SessionManager();