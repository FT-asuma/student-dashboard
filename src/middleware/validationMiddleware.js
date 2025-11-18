// Input validation middleware
const { body, validationResult } = require('express-validator');
const constants = require('../utils/constants');

// Validation rules for login
const loginValidationRules = () => {
  return [
    body('username')
      .isString()
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Username must be 3-50 characters long'),
    body('password')
      .isString()
      .isLength({ min: 6, max: 100 })
      .withMessage('Password must be 6-100 characters long'),
    body('token')
      .optional()
      .isString()
      .isLength({ min: 64, max: 64 })
      .withMessage('Token must be a valid 64-character hex string')
  ];
};

// Validation handler
const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

// Main validation middleware
const validate = (req, res, next) => {
  loginValidationRules();
  handleValidation(req, res, next);
};

module.exports = {
  validate,
  loginValidationRules,
  handleValidation
};