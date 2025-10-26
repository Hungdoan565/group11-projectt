const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const uploadController = require("../controllers/uploadController");
const { protect } = require("../middlewares/auth");

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type"));
    }
  },
});

// Protected routes
router.post("/upload/avatar", protect, upload.single("avatar"), uploadController.uploadAvatar);
router.post("/upload/cover", protect, upload.single("cover"), uploadController.uploadCover);

module.exports = router;

