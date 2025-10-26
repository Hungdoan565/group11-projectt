// Middleware to protect routes (check if user is authenticated)
exports.protect = (req, res, next) => {
  const jwt = require("jsonwebtoken");
  const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to check user role/permission
exports.permit = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      next();
    } else {
      res.status(403).json({ message: "Access denied" });
    }
  };
};

// Middleware to allow user to delete their own profile or admin to delete any user
exports.allowSelfOrAdmin = (req, res, next) => {
  if (req.user && (req.user.role === "admin" || req.user.id === req.params.id)) {
    next();
  } else {
    res.status(403).json({ message: "Access denied" });
  }
};
