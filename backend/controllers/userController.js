const User = require("../models/User");

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().lean();
    // Ensure id field exists on lean docs similar to toJSON transform
    const normalized = users.map((u) => ({
      id: u._id.toString(),
      name: u.name,
      email: u.email,
    }));
    res.json(normalized);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
     const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and Email are required" });
    }
    const user = await User.create({ name, email });
    res
      .status(201)
      .json({ id: user._id.toString(), name: user.name, email: user.email });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: err.message });
  }
};