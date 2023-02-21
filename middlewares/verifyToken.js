const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../config/config");

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.token || req.body.token;
        const ip = req.ip;

        if (!token) {
            return res.status(400).json("Token not found");
        }

        const decodedToken = jwt.decode(token, jwtSecret);

        if (!decodedToken) {
            return res.status(400).json("Token verification error");
        }

        if (decodedToken.ip !== req.ip) {
            return res.status(400).json("Token error : ip did't match");
        }

        const tokenIssuedAt = decodedToken.iat * 1000;
        const now = Date.now();

        const difference = now - tokenIssuedAt;
        if (difference - 3 * 60 * 60 * 1000 > 0) {
            return res.status(400).json("Token expired (3hrs) : login again");
        }

        const { iat, ...data } = decodedToken;

        const newToken = jwt.decode(data, jwtSecret);
        req.token = newToken;
        req.header("token", newToken);

        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

module.exports = verifyToken;
