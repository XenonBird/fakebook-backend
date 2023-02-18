require("dotenv").config();

module.exports = {
    port: process.env.PORT || 5000,
    db: {
        host: process.env.DB_HOST || "127.0.0.1",
        port: process.env.DB_PORT || 27017,
        name: process.env.DB_NAME || "fakebook",
        pass: process.env.DB_PASS || "",
    },
    jwtSecret: process.env.JWT_SECRET || "my-jwt-secret",
};
