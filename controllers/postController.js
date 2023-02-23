const Post = require("../models/post");
const User = require("../models/user");

const createPost = async (req, res, next) => {
    try {
        const { content, image } = req.body;
        const userId = req.token.id;

        if (!content && !image) {
            res.status(401);
            throw Error("🔴 Content or image is required");
        }
        // All validation goes here

        const newPost = new Post({ content, image, author: userId });
        const done = await newPost.save();

        const user = await User.findById(userId);
        user.posts.push(done._id);
        user.save();

        res.status(200).json(done);
    } catch (error) {
        next(error);
    }
};

const getAllPostsByUserId = (req, res) => {
    // It will be added later
};

const getPostTimelineById = async (req, res) => {
    // It will be added later
};

const getPostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findById(postId)
            .populate("author", "username email")
            .populate("comments", "text author")
            .populate("likes", "username email");

        if (!post) {
            res.status(404);
            throw Error("🔴 Post not found");
        }

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

const updatePostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { content, image } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404);
            throw Error("🔴 Post not found");
        }

        post.content = content || post.content;
        post.image = image || post.image;

        if (!post.content && !post.image) {
            res.status(404);
            throw Error(
                "🔴 Content and image both can not be empty at the same time"
            );
        }

        await post.save();

        res.status(202).json(post);
    } catch (error) {
        next(error);
    }
};

const deletePostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const post = await Post.findByIdAndRemove(postId);

        if (!post) {
            res.status(404);
            throw Error("🔴 Post not found");
        }

        const user = await User.findById(post.author);
        const postIndexInPosts = user.posts.indexOf(post.author);
        user.posts.splice(postIndexInPosts, 1);
        user.save();

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

const addLikePostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.token.id;

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404);
            throw Error("🔴 Post not found");
        }

        if (post.likes.includes(userId)) {
            res.status(404);
            throw Error("🔴 Already liked");
        }

        post.likes.push(userId);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

// const getLikePostById = async (req, res) => {
//     const { postId } = req.params;
//     try {
//         const post = await Post.findById(postId)
//             .populate("author", "username email")
//             .populate("comments", "content author")
//             .populate("likes", "username email");

//         if (!post) {
//             return res.status(404).json({ error: "Post not found" });
//         }

//         res.status(200).json(post);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

const removeLikePostById = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const userId = req.token.id;

        const post = await Post.findById(postId);

        if (!post) {
            res.status(404);
            throw Error("🔴 Post not found");
        }

        const likeIndexInLikes = post.likes.indexOf(userId);

        post.likes.splice(likeIndexInLikes, 1);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllPostsByUserId,
    getPostTimelineById,
    createPost,
    getPostById,
    updatePostById,
    deletePostById,
    addLikePostById,
    removeLikePostById,
};
