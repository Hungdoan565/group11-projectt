const User = require("../models/User");

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      coverPhoto: user.coverPhoto,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch profile", error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, avatar, coverPhoto, currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (coverPhoto !== undefined) user.coverPhoto = coverPhoto;

    if (newPassword) {
      if (!currentPassword) {
        return res
          .status(400)
          .json({ message: "Vui lòng nhập mật khẩu hiện tại" });
      }
      const ok = await user.comparePassword(currentPassword);
      if (!ok)
        return res
          .status(400)
          .json({ message: "Mật khẩu hiện tại không đúng" });
      user.password = newPassword; // hashed by pre-save
    }

    await user.save();
    return res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
      coverPhoto: user.coverPhoto,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to update profile", error: err.message });
  }
};
