const authRoutes = require("express").Router();
const {
    createUser,
    loginUser,
    logoutUser,
    updateUserById,
    deleteUserById,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/verifyToken");

// Route for creating a new user
authRoutes.post("/register", createUser);

// Route for authenticating a user
authRoutes.post("/login", loginUser);

// Route for logout
authRoutes.post("/logout", logoutUser);

// Route for updating a user by ID
authRoutes.put("/update", verifyToken, updateUserById);

// Route for deleting a user by ID
authRoutes.delete("/delete", verifyToken, deleteUserById);

module.exports = authRoutes;
