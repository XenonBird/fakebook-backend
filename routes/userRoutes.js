const express = require("express");
const userRoutes = express.Router();
const {
    createUser,
    loginUser,
    logoutUser,
    getUserById,
    updateUserById,
    deleteUserById,
} = require("../controllers/userController");

// Route for creating a new user
userRoutes.post("/", createUser);

// Route for authenticating a user
userRoutes.post("/login", loginUser);

// Route for logout
userRoutes.post("/logout", logoutUser)

// Route for fetching a user by ID
userRoutes.get("/:userId", getUserById);

// Route for updating a user by ID
userRoutes.put("/:userId", updateUserById);

// Route for deleting a user by ID
userRoutes.delete("/:userId", deleteUserById);

module.exports = userRoutes;
