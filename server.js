const express = require("express");
const morgan = require("morgan");
const ip = require("ip");
const cors = require("cors");

const { port } = require("./config/config");
const userRoutes = require("./routes/userRoutes");

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
app.use("/api/user", userRoutes);

// =========================================
//                  LISTEN
// =========================================
app.listen(port, () => {
    console.log(`🟢 http://${ip.address()}:${port}`);
    console.log(`🟢 http://localhost:${port}`);
});
