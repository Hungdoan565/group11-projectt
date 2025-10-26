const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Health check route
app.get('/', (req, res) => {
  res.json({
    message: 'Group11 Backend API is running!',
    status: 'OK',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth/*',
      users: '/api/users',
      profile: '/api/profile',
      upload: '/api/upload/*'
    }
  });
});

// Routes
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const uploadRoutes = require("./routes/upload.js");
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", uploadRoutes);

// DB Connection
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.warn(
    "Warning: MONGODB_URI is not set in environment. Set it in backend/.env"
  );
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
