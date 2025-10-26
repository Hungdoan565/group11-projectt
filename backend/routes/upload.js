const express = require("express");
const multer = require("multer");
const cloudinary = require("../lib/cloudinary");
const { protect } = require("../middlewares/auth");
const User = require("../models/User");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/avatar", protect, upload.single("avatar"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Vui lòng chọn ảnh" });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "avatars", resource_type: "image" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Upload thất bại", error: error.message });
        }
        await User.findByIdAndUpdate(req.user.id, {
          avatar: result.secure_url,
        });
        return res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Upload thất bại", error: err.message });
  }
});

router.post("/cover", protect, upload.single("cover"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "Vui lòng chọn ảnh" });

    const stream = cloudinary.uploader.upload_stream(
      { folder: "covers", resource_type: "image" },
      async (error, result) => {
        if (error) {
          return res
            .status(500)
            .json({ message: "Upload thất bại", error: error.message });
        }
        await User.findByIdAndUpdate(req.user.id, {
          coverPhoto: result.secure_url,
        });
        return res.json({ url: result.secure_url });
      }
    );

    stream.end(req.file.buffer);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Upload thất bại", error: err.message });
  }
});

module.exports = router;
