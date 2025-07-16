import { body } from 'express-validator';

export const registerValidation = [
  body('email').isEmail().withMessage('Invalid email').normalizeEmail(),
  body('username').isLength({ min: 3, max: 25 }).withMessage('Username must be 3-25 characters').trim().escape(),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
    .matches(/[A-Z]/).withMessage('Must include at least one uppercase letter')
    .matches(/[a-z]/).withMessage('Must include at least one lowercase letter')
    .matches(/[0-9]/).withMessage('Must include at least one number')
    .matches(/[!@#\$%\^&\*]/).withMessage('Must include at least one special character(i.e. #!&?)'),
];

export const loginValidation = [
  body('email').isEmail().normalizeEmail(),
  body('password').exists().withMessage('Password is required'),
];