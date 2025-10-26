const express = require('express');
const { body } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/signup',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Tên tối thiểu 2 ký tự'),
    body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
    body('password').isLength({ min: 6 }).withMessage('Mật khẩu tối thiểu 6 ký tự'),
  ],
  authController.signup
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email không hợp lệ').normalizeEmail(),
    body('password').notEmpty().withMessage('Vui lòng nhập mật khẩu'),
  ],
  authController.login
);

router.post('/logout', authController.logout);

router.post('/forgot-password', [body('email').isEmail()], authController.forgotPassword);
router.post('/reset-password', [body('token').notEmpty(), body('password').isLength({ min: 6 })], authController.resetPassword);

module.exports = router;