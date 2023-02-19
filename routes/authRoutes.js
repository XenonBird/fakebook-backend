const authRoutes = require("express").Router();
const {
    createUser,
    loginUser,
    logoutUser,
} = require("../controllers/userController");

// Route for creating a new user
authRoutes.post("/register", createUser);

// Route for authenticating a user
authRoutes.post("/login", loginUser);

// Route for logout
authRoutes.post("/logout", logoutUser);

module.exports = authRoutes;
