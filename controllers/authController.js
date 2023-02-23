const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

// ========================================================
//              Operations for self
// ========================================================

const createUser = async (req, res, next) => {
    try {
        const { username, email, password, bio, profilePicture } = req.body;

        // Check if all required inputs are given or not
        if (!username || !email || !password) {
            res.status(401);
            throw Error("🔴 username, email or password is empty");
        }

        // Check if username already exist
        const ifUsernameExist = await User.findOne({ username });
        if (ifUsernameExist) {
            res.status(401);
            throw Error("🔴 Username is already registered");
        }

        // Check if email already exist
        const ifEmailExist = await User.findOne({ email });
        if (ifEmailExist) {
            res.status(401);
            throw Error("🔴 Email is already registered");
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user and save it to the database
        const user = new User({ username, email, hash, bio, profilePicture });
        await user.save();

        // Generate a JWT token for the authenticated user
        const data = { id: user._id, ip: req.ip, type: user.type };
        req.token = data;

        // Respond with the authenticated user and the JWT token
        const newToken = jwt.sign(data, jwtSecret);
        res.header("token", newToken);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const loginUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        if (!username && !email) {
            res.status(401);
            throw Error("🔴 Please provide email or username");
        }

        // Find the user with the given email
        var user = await User.findOne({ email });
        if (!user) {
            user = await User.findOne({ username });
        }

        if (!user) {
            res.status(401);
            throw Error("🔴 Invalid email or username");
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.hash);

        if (!isMatch) {
            res.status(401);
            throw Error("🔴 Invalid email or password");
        }

        // Generate a JWT token for the authenticated user
        const data = { id: user._id, ip: req.ip, type: user.type };
        req.token = data;

        // Respond with the authenticated user and the JWT token
        const newToken = jwt.sign(data, jwtSecret);
        res.header("token", newToken);

        res.status(201).json(user);
    } catch (error) {
        next(error);
    }
};

const logoutUser = async (req, res, next) => {
    try {
        res.header("token", "");
        res.status(201).json("OK");
    } catch (error) {
        next(error);
    }
};

const updateUserById = async (req, res, next) => {
    try {
        var userId = req.token.id;
        const { username, email, bio, profilePicture } = req.body;

        // Find the user with the given ID
        const user = await User.findById(userId);

        if (!user) {
            res.status(401);
            throw Error("🔴 User not found");
        }

        // Update the user data
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.profilePicture = profilePicture || user.profilePicture;
        await user.save();

        // Respond with the updated user data
        res.json(user);
    } catch (error) {
        next(error);
    }
};

const deleteUserById = async (req, res, next) => {
    try {
        const userId = req.token.id;

        // Find the user with the given ID and remove it from the database
        const user = await User.deleteOne({ _id: userId });

        if (!user) {
            res.status(401);
            throw Error("🔴 User not found");
        }

        // Respond with the removed user
        res.json(user);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    updateUserById,
    deleteUserById,
};
