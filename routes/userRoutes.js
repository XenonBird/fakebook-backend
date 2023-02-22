const express = require("express");
const userRoutes = express.Router();
const {
    getUserById,
    followUserById,
    unfollowUserById,
} = require("../controllers/userController");
const verifyToken = require("../middlewares/verifyToken");

// Route for fetching a user by ID
userRoutes.get("/:userId", verifyToken, getUserById);

// follow
// Route for follow an user
postRoutes.post("/:userId/follow", verifyToken, followUserById);

// Route for remove from follow
postRoutes.post("/:userId/unfollow", verifyToken, unfollowUserById);

module.exports = userRoutes;
