// Student data operations service
const puppeteerService = require('./puppeteerService');
const sessionManager = require('./sessionManager');
const logger = require('../utils/logger');

class StudentService {
  // Get student dashboard data after login
  async getStudentDashboard(sessionToken) {
    const session = sessionManager.getSession(sessionToken);
    if (!session) {
      throw new Error('Invalid session');
    }

    try {
      // Navigate to dashboard and extract data
      await session.page.goto('https://student.tcti.uz/dashboard', {
        waitUntil: 'networkidle2'
      });

      // Extract dashboard information
      const dashboardData = await session.page.evaluate(() => {
        return {
          profile: {
            name: document.querySelector('.student-name')?.textContent?.trim() || null,
            id: document.querySelector('.student-id')?.textContent?.trim() || null,
            email: document.querySelector('.student-email')?.textContent?.trim() || null
          },
          grades: Array.from(document.querySelectorAll('.grade-item')).map(item => ({
            subject: item.querySelector('.subject')?.textContent?.trim() || null,
            grade: item.querySelector('.grade')?.textContent?.trim() || null,
            date: item.querySelector('.date')?.textContent?.trim() || null
          })),
          schedule: Array.from(document.querySelectorAll('.schedule-item')).map(item => ({
            subject: item.querySelector('.subject')?.textContent?.trim() || null,
            time: item.querySelector('.time')?.textContent?.trim() || null,
            room: item.querySelector('.room')?.textContent?.trim() || null
          }))
        };
      });

      logger.info(`Dashboard data retrieved for user: ${session.username}`);
      return dashboardData;

    } catch (error) {
      logger.error(`Error getting dashboard data for ${session.username}:`, error.message);
      throw error;
    }
  }

  // Get student grades
  async getGrades(sessionToken) {
    const session = sessionManager.getSession(sessionToken);
    if (!session) {
      throw new Error('Invalid session');
    }

    try {
      await session.page.goto('https://student.tcti.uz/grades', {
        waitUntil: 'networkidle2'
      });

      const grades = await session.page.evaluate(() => {
        return Array.from(document.querySelectorAll('.grade-row')).map(row => ({
          subject: row.querySelector('.subject')?.textContent?.trim() || null,
          currentGrade: row.querySelector('.current-grade')?.textContent?.trim() || null,
          maxGrade: row.querySelector('.max-grade')?.textContent?.trim() || null,
          percentage: row.querySelector('.percentage')?.textContent?.trim() || null
        }));
      });

      return grades;

    } catch (error) {
      logger.error(`Error getting grades for ${session.username}:`, error.message);
      throw error;
    }
  }

  // Get student schedule
  async getSchedule(sessionToken) {
    const session = sessionManager.getSession(sessionToken);
    if (!session) {
      throw new Error('Invalid session');
    }

    try {
      await session.page.goto('https://student.tcti.uz/schedule', {
        waitUntil: 'networkidle2'
      });

      const schedule = await session.page.evaluate(() => {
        return Array.from(document.querySelectorAll('.schedule-day')).map(day => ({
          day: day.querySelector('.day-header')?.textContent?.trim() || null,
          classes: Array.from(day.querySelectorAll('.class-item')).map(cls => ({
            subject: cls.querySelector('.subject')?.textContent?.trim() || null,
            time: cls.querySelector('.time')?.textContent?.trim() || null,
            room: cls.querySelector('.room')?.textContent?.trim() || null,
            teacher: cls.querySelector('.teacher')?.textContent?.trim() || null
          }))
        }));
      });

      return schedule;

    } catch (error) {
      logger.error(`Error getting schedule for ${session.username}:`, error.message);
      throw error;
    }
  }
}

module.exports = new StudentService();