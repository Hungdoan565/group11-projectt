const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const User = require("../models/User");

const signToken = (user) => {
  const payload = { sub: user.id, role: user.role };
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email đã tồn tại" });
    }

    const isFirstUser = (await User.countDocuments()) === 0;
    const role = isFirstUser ? "admin" : "user";

    const user = await User.create({ name, email, password, role });

    const token = signToken(user);
    return res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        coverPhoto: user.coverPhoto,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đăng ký thất bại", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "Email hoặc mật khẩu không đúng" });

    const token = signToken(user);
    return res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        coverPhoto: user.coverPhoto,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Đăng nhập thất bại", error: err.message });
  }
};

exports.logout = async (_req, res) => {
  // Stateless JWT: logout handled on client by deleting token
  return res.json({ message: "Đăng xuất thành công" });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select(
      "+passwordResetToken +passwordResetExpires"
    );
    if (!user)
      return res
        .status(200)
        .json({ message: "Nếu email tồn tại, mã đặt lại đã được gửi" });
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashed = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expires = Date.now() + 15 * 60 * 1000;

    user.passwordResetToken = hashed;
    user.passwordResetExpires = new Date(expires);
    await user.save({ validateBeforeSave: false });

    // In real app, send email containing the token link. For assignment/demo, return token.
    return res.json({
      message: "Tạo token đặt lại mật khẩu thành công",
      resetToken,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Không thể tạo token đặt lại", error: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    const hashed = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      passwordResetToken: hashed,
      passwordResetExpires: { $gt: new Date() },
    }).select("+password");
    if (!user)
      return res
        .status(400)
        .json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    user.password = password; // will be hashed by pre-save hook
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.json({ message: "Đổi mật khẩu thành công" });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Không thể đổi mật khẩu", error: err.message });
  }
};
