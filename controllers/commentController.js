const Comment = require("../models/comment");
const Post = require("../models/post");

const createComment = async (req, res, next) => {
    try {
        const { postId } = req.params;
        const { text } = req.body;
        const author = req.token.id;

        // All validation goes here
        const post = await Post.findById(postId);
        if (!post) {
            res.status(404);
            throw Error("🔴 Post not found");
        }

        if (!text) {
            res.status(404);
            throw Error("🔴 Text not found");
        }

        const newComment = new Comment({ text, author, post: postId });
        const comment = await newComment.save();

        post.comments.push(comment._id);
        await post.save();

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

const getCommentById = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const comment = await Comment.findById(commentId)
            .populate("post", "")
            .populate("author", "username")
            .populate("likes", "username");

        if (!comment) {
            res.status(404);
            throw Error("🔴 Comment not found");
        }

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

const updateCommentById = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const { text } = req.body;

        const comment = await Comment.findById(commentId);

        if (!comment) {
            res.status(404);
            throw Error("🔴 Comment not found");
        }

        comment.text = text || comment.text;

        if (!comment.text) {
            res.status(404);
            throw Error("🔴 Text not found");
        }
        await comment.save();

        res.status(202).json(comment);
    } catch (error) {
        next(error);
    }
};

const deleteCommentById = async (req, res, next) => {
    try {
        const { commentId } = req.params;

        const comment = await Comment.deleteOne({ _id: commentId });

        if (!comment) {
            res.status(404);
            throw Error("🔴 Comment not found");
        }

        const post = await Post.findById(comment.author);
        const commentIndexInComments = post.comments.indexOf(comment._id);
        post.comments.splice(commentIndexInComments, 1);
        post.save();

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

const addLikeCommentById = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const author = req.token.id;

        if (!author) {
            res.status(404);
            throw Error("🔴 Author not found");
        }

        const comment = await Comment.findById(commentId);

        if (!comment) {
            res.status(404);
            throw Error("🔴 Comment not found");
        }

        if (comment.likes.includes(author)) {
            res.status(404);
            throw Error("🔴 Already liked");
        }

        comment.likes.push(author);
        await comment.save();

        res.status(200).json(comment);
    } catch (error) {
        next(error);
    }
};

const removeLikeCommentById = async (req, res, next) => {
    try {
        const { commentId } = req.params;
        const author = req.token.id;

        if (!author) {
            res.status(404);
            throw Error("🔴 Author not found");
        }
        const Comment = await Comment.findById(commentId);

        if (!Comment) {
            res.status(404);
            throw Error("🔴 Comment not found");
        }

        const likeIndexInLikes = Comment.likes.indexOf(author);

        Comment.likes.splice(likeIndexInLikes, 1);
        await Comment.save();

        res.status(200).json(post);
    } catch (error) {
        next(error);
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
