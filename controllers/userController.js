const User = require("../models/user");

// ========================================================
//              Operations for other users
// ========================================================

const getUserById = async (req, res, next) => {
    try {
        const { userId } = req.params;
        // Find the user with the given ID
        if (!userId) {
            res.status(404);
            throw Error("🔴 UserId is invalid");
        }

        const user = await User.findById(userId)
            .populate("posts", "content createdAt likes comments")
            .populate("followers", "username profilePicture")
            .populate("followings", "username profilePicture");
        if (!user) {
            res.status(401);
            throw Error("🔴 User is not found");
        }

        // Respond with the user data
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};
const followUserById = async (req, res, next) => {
    try {
        const otherUserId = req.params.userId;
        const thisUserId = req.token.id;

        // Find the user with the given ID
        if (!otherUserId) {
            res.status(404);
            throw Error("🔴 Given user id is invalid");
        }

        if (thisUserId === otherUserId) {
            res.status(404);
            throw Error("🔴 You can not follow yourself");
        }

        const otherUser = await User.findById(otherUserId)
            .populate("posts", "content createdAt likes comments")
            .populate("followers", "username profilePicture")
            .populate("followings", "username profilePicture");

        if (!otherUser) {
            res.status(401);
            throw Error("🔴 User is not found");
        }

        if (otherUser.followers.includes(thisUserId)) {
            res.status(404);
            throw Error("🔴 Already following");
        }

        const thisUser = await User.findById(thisUserId);

        otherUser.followers.push(thisUserId);
        await otherUser.save();
        thisUser.followings.push(otherUserId);
        await thisUser.save();

        // Respond with the user data
        res.status(200).json("OK");
    } catch (error) {
        next(error);
    }
};
const unfollowUserById = async (req, res, next) => {
    try {
        const otherUserId = req.params.userId;
        const thisUserId = req.token.id;

        // Find the user with the given ID
        if (!otherUserId) {
            res.status(404);
            throw Error("🔴 Given user id is invalid");
        }

        if (thisUserId === otherUserId) {
            res.status(404);
            throw Error("🔴 You can not unfollow yourself");
        }

        const otherUser = await User.findById(otherUserId)
            .populate("posts", "content createdAt likes comments")
            .populate("followers", "username profilePicture")
            .populate("followings", "username profilePicture");

        if (!otherUser) {
            res.status(401);
            throw Error("🔴 User is not found");
        }
        // const indexOfFollower = otherUser.followers.indexOf(thisUserId);
        const indexOfFollower = otherUser.followers.findIndex(
            (obj) => obj._id.toString() === thisUserId
        );

        if (indexOfFollower < 0) {
            res.status(404);
            console.log(otherUser.followers, thisUserId);
            throw Error("🔴 Not following at the first place : ");
        }

        const thisUser = await User.findById(thisUserId);

        const indexOfFollowing = thisUser.followings.findIndex(
            (obj) => obj._id.toString() === otherUserId
        );
        if (indexOfFollowing < 0) {
            res.status(404);
            throw Error("🔴 Server is busy");
        }

        otherUser.followers.splice(indexOfFollower, 1);
        await otherUser.save();
        thisUser.followings.splice(indexOfFollowing, 1);
        await thisUser.save();

        // Respond with the user data
        res.status(200).json("OK");
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const userId = req.token.id;
        // Find the user with the given ID
        if (!userId) {
            res.status(404);
            throw Error("🔴 UserId is invalid");
        }

        const user = await User.findById(userId)
            .populate("posts", "content createdAt likes comments")
            .populate("followers", "username profilePicture")
            .populate("followings", "username profilePicture");
        if (!user) {
            res.status(401);
            throw Error("🔴 User is not found");
        }

        // Respond with the user data
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getUserById,
    followUserById,
    unfollowUserById,
    getMe,
};
