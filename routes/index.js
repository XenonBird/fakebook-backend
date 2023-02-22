const Comment = require("../models/comment");
const Post = require("../models/post");
const User = require("../models/user");

const indexRouters = require("express").Router();

indexRouters.get("/", async (req, res) => {
    try {
        const users = await User.find({}).populate("posts", "content image");
        const posts = await Post.find({})
            .populate("likes", "username")
            .populate("comments", "text author");
        const comments = await Comment.find({})
            .populate("author", "username")
            .populate("likes", "username")
            .populate("post", "content");

        res.status(200).json({
            users,
            posts,
        });
    } catch (error) {
        res.status(500).json({ error });
    }
});

module.exports = indexRouters;
