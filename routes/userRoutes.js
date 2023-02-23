const express = require("express");
const userRoutes = express.Router();
const {
    getUserById,
    followUserById,
    unfollowUserById,
    getMe,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

// Route for fetching a user by ID
userRoutes.get("/:userId", verifyToken, getUserById);

// follow
// Route for follow an user
userRoutes.post("/:userId/follow", verifyToken, followUserById);

// Route for remove from follow
userRoutes.post("/:userId/unfollow", verifyToken, unfollowUserById);

userRoutes.get("/",verifyToken, getMe)

module.exports = userRoutes;
