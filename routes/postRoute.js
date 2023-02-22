const {
    getPostById,
    createPost,
    updatePostById,
    deletePostById,
    addLikePostById,
    removeLikePostById,
} = require("../controllers/postController");
const verifyToken = require("../middlewares/verifyToken");

const postRoutes = require("express").Router();

// Route for create new post
postRoutes.post("/new", verifyToken, createPost);

// Route for fetching a post by it's id
postRoutes.get("/:postId", getPostById);

// Route for updating a post by it's id
postRoutes.put("/:postId", verifyToken, updatePostById);

// Route for deleting a post by it's id
postRoutes.delete("/:postId", verifyToken, deletePostById);

// Likes
// Route for adding a like to the post
postRoutes.post("/:postId/like", verifyToken, addLikePostById);

// Route for getting a like to the post
postRoutes.post("/:postId/like", verifyToken, addLikePostById);

// Route for removing a like from the post
postRoutes.post("/:postId/unlike", verifyToken, removeLikePostById);

module.exports = postRoutes;
