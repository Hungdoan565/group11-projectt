const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

// Public routes
router.post("/auth/signup", authController.signup);
router.post("/auth/login", authController.login);
router.post("/auth/logout", authController.logout);
router.post("/auth/forgot-password", authController.forgotPassword);
router.post("/auth/reset-password", authController.resetPassword);

// Protected routes
router.get("/profile", protect, authController.getProfile);
router.put("/profile", protect, authController.updateProfile);

module.exports = router;

