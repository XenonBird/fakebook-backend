const Comment = require("../models/comment");
const Post = require("../models/post");

const createComment = async (req, res) => {
    const { postId } = req.query;
    const { content, author } = req.body;

    try {
        // All validation goes here
        console.log({postId});
        const newComment = new Comment({ content, author, post: postId });
        const comment = await newComment.save();

        const post = await Post.findById(postId);
        post.posts.push(comment._id);
        post.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getCommentById = async (req, res) => {
    const { commentId } = req.params;
    try {
        const comment = await Comment.findById(commentId)
            .populate("post", "")
            .populate("author", "username")
            .populate("likes", "username");

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateCommentById = async (req, res) => {
    const { commentId } = req.params;
    const { content } = req.body;

    try {
        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        comment.content = content || comment.content;

        await comment.save();

        res.status(202).json(comment);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const deleteCommentById = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await Comment.findByIdAndRemove(commentId);

        if (!comment) {
            return res.status(404).json({ error: "comment not found" });
        }

        const post = await Post.findById(comment.author);
        const commentIndexInComments = post.comments.indexOf(comment._id);
        post.comments.splice(commentIndexInComments, 1);
        post.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

const addLikeCommentById = async (req, res) => {
    const { commentId } = req.params;
    const { user } = req.body;

    try {
        if (!user) {
            return res.status(404).json({ error: "User not defined " });
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            return res.status(404).json({ error: "comment not found" });
        }

        if (comment.likes.includes(user)) {
            return res.status(400).json("Already liked");
        }

        comment.likes.push(user);
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeLikeCommentById = async (req, res) => {
    const { commentId } = req.params;
    const { user } = req.body;

    try {
        if (!user) {
            return res.status(404).json({ error: "User not defined " });
        }
        const Comment = await Comment.findById(commentId);

        if (!Comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        const likeIndexInLikes = Comment.likes.indexOf(user);

        Comment.likes.splice(likeIndexInLikes, 1);
        await Comment.save();

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createComment,
    getCommentById,
    updateCommentById,
    deleteCommentById,
    addLikeCommentById,
    removeLikeCommentById,
};
