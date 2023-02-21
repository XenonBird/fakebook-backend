const express = require("express");
const userRoutes = express.Router();
const {
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

// Route for fetching a user by ID
userRoutes.get("/:userId", verifyToken, getUserById);

// Route for updating a user by ID
userRoutes.put("/:userId", verifyToken, updateUserById);

// Route for deleting a user by ID
userRoutes.delete("/:userId", verifyToken, deleteUserById);

module.exports = userRoutes;
