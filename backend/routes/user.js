const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, permit, allowSelfOrAdmin } = require("../middlewares/auth");

// All routes below require authentication
router.use(protect);

// Admin: GET all users
router.get("/users", permit("admin"), userController.getUsers);

// Admin: create new user
router.post("/users", permit("admin"), userController.createUser);

// Admin: update user
router.put("/users/:id", permit("admin"), userController.updateUser);

// Admin or self: delete user
router.delete("/users/:id", allowSelfOrAdmin, userController.deleteUser);

module.exports = router;
