const express = require("express");
const userRoutes = express.Router();
const {
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../controllers/userController");

// Route for fetching a user by ID
userRoutes.get("/:userId", getUserById);

// Route for updating a user by ID
userRoutes.put("/:userId", updateUserById);

// Route for deleting a user by ID
userRoutes.delete("/:userId", deleteUserById);

module.exports = userRoutes;
