const express = require("express");
const morgan = require("morgan");
const ip = require("ip");
const cors = require("cors");

const { port } = require("./config/config");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const indexRouters = require("./routes");

// =========================================
//        CONSTANTS & CONFIGURATIONS
// =========================================
console.clear();
require("./db-connection");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(morgan("common"));

// =========================================
//                  ROUTES
// =========================================
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api", indexRouters);

app.use("/*", (req, res) => {
    res.status(404).json("Not found");
});

// =========================================
//                  LISTEN
// =========================================
app.listen(port, () => {
    console.log(`🟢 http://${ip.address()}:${port}`);
    console.log(`🟢 http://localhost:${port}`);
});
