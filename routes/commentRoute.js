const commentRoutes = require("express").Router();
const {
    createComment,
    getCommentById,
    updateCommentById,
    deleteCommentById,
    addLikeCommentById,
    removeLikeCommentById,
} = require("../controllers/commentController");
const verifyToken = require("../middlewares/verifyToken");

// Create a new comment for a post
commentRoutes.post("/:postId/new", verifyToken, createComment);

// Get a specific comment by ID
commentRoutes.get("/:commentId", getCommentById);

// Update a specific comment by ID
commentRoutes.put("/:commentId", verifyToken, updateCommentById);

// Delete a specific comment by ID
commentRoutes.delete("/:commentId", verifyToken, deleteCommentById);

// Like a specific comment by ID
commentRoutes.post("/:commentId/like", verifyToken, addLikeCommentById);

// Remove a like from a specific comment by ID
commentRoutes.delete("/:commentId/like", verifyToken, removeLikeCommentById);

module.exports = commentRoutes;
