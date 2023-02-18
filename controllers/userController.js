const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { jwtSecret } = require("../config/config");

const createUser = async (req, res) => {
    const { username, email, password, bio, profilePicture } = req.body;

    try {
        // Check if all required inputs are given or not
        if (!username || !email || !password) {
            return res
                .status(401)
                .json({ error: "username, email or password is empty" });
        }

        // Check if username already exist
        const ifUsernameExist = await User.findOne({ username });
        if (ifUsernameExist) {
            return res
                .status(401)
                .json({ error: "Username is already registered " });
        }

        // Check if email already exist
        const ifEmailExist = await User.findOne({ username });
        if (ifEmailExist) {
            return res
                .status(401)
                .json({ error: "Email is already registered " });
        }

        // Hash the password before storing it
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // Create a new user and save it to the database
        const user = new User({ username, email, hash, bio, profilePicture });
        await user.save();

        // Generate a JWT token for the new user
        const token = jwt.sign({ id: user._id, ip: req.ip }, jwtSecret);

        // Respond with the new user and the JWT token
        res.status(201).json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user with the given email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.hash);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Generate a JWT token for the authenticated user
        const token = jwt.sign({ id: user._id, ip: req.ip }, jwtSecret);

        // Respond with the authenticated user and the JWT token
        res.json({ user, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const logoutUser = async (req, res) => {
    // Generate a empty JWT token
    const token = jwt.sign({}, jwtSecret);

    // Respond with the authenticated user and the JWT token
    res.status(200).json({ token });
};

const getUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user with the given ID
        const user = await User.findById(userId)
        // .populate(
        //     "following followers posts"
        // );

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with the user data
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const updateUserById = async (req, res) => {
    const { userId } = req.params;
    const { username, email, bio, profilePicture } = req.body;

    try {
        // Find the user with the given ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Update the user data
        user.username = username || user.username;
        user.email = email || user.email;
        user.bio = bio || user.bio;
        user.profilePicture = profilePicture || user.profilePicture;
        await user.save();

        // Respond with the updated user data
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUserById = async (req, res) => {
    const { userId } = req.params;

    try {
        // Find the user with the given ID and remove it from the database
        const user = await User.findByIdAndRemove(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Respond with the removed user
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getUserById,
    updateUserById,
    deleteUserById,
};
