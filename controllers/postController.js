const Post = require("../models/post");
const User = require("../models/user");

const createPost = async (req, res) => {
    const { content, image = "", author } = req.body;

    try {
        // All validation goes here

        const newPost = new Post({ content, image, author });
        const done = await newPost.save();

        const user = await User.findById(author);
        user.posts.push(done._id);
        user.save();

        res.status(200).json(done);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllPostsByUserId = (req, res) => {
    // It will be added later
};

const getPostTimelineById = async (req, res) => {
    // It will be added later
};

const getPostById = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId)
            .populate("author", "username email")
            .populate("likes", "username email");

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updatePostById = async (req, res) => {
    const { postId } = req.params;
    const { content, image, author } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        post.content = content || post.content;
        post.image = image || post.image;

        await post.save();

        res.status(202).json(post);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const deletePostById = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findByIdAndRemove(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const user = await User.findById(post.author);
        const postIndexInPosts = user.posts.indexOf(post.author);
        user.posts.splice(postIndexInPosts, 1);
        user.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const addLikePostById = async (req, res) => {
    const { postId } = req.params;
    const { user } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (post.likes.includes(user)) {
            return res.status(400).json("Already liked");
        }

        post.likes.push(user);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeLikePostById = async (req, res) => {
    const { postId } = req.params;
    const { user } = req.body;

    try {
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const likeIndexInLikes = post.likes.indexOf(user);

        post.likes.splice(likeIndexInLikes, 1);
        await post.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: err.message });
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