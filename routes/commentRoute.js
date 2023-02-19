const commentRoutes = require("express").Router();
const {
    createComment,
    getCommentById,
    updateCommentById,
    deleteCommentById,
    addLikeCommentById,
    removeLikeCommentById,
} = require("../controllers/commentController");

// Create a new comment for a post
commentRoutes.post("/:postId/new", createComment);

// Get a specific comment by ID
commentRoutes.get("/:commentId", getCommentById);

// Update a specific comment by ID
commentRoutes.put("/:commentId", updateCommentById);

// Delete a specific comment by ID
commentRoutes.delete("/:commentId", deleteCommentById);

// Like a specific comment by ID
commentRoutes.post("/:commentId/like", addLikeCommentById);

// Remove a like from a specific comment by ID
commentRoutes.delete("/:commentId/like", removeLikeCommentById);

module.exports = commentRoutes;
