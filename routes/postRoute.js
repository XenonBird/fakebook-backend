const {
    getPostById,
    createPost,
    updatePostById,
    deletePostById,
    addLikePostById,
    removeLikePostById,
} = require("../controllers/postController");

const postRoutes = require("express").Router();

// Route for create new post
postRoutes.post("/new", createPost);

// Route for fetching a post by it's id
postRoutes.get("/:postId", getPostById);

// Route for updating a post by it's id
postRoutes.put("/:postId", updatePostById);

// Route for deleting a post by it's id
postRoutes.delete("/:postId", deletePostById);

// Likes
// Route for adding a like to the post
postRoutes.post("/:postId/like", addLikePostById);


// Route for getting a like to the post
postRoutes.post("/:postId/like", addLikePostById);

// Route for removing a like from the post
postRoutes.delete("/:postId/like", removeLikePostById);

module.exports = postRoutes;
