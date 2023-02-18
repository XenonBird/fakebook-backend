const mongoose = require("mongoose");
const { db } = require("./config/config");

// =========================================
//        CONSTANTS & CONFIGARATIONS
// =========================================
mongoose.set("strictQuery", false);

const url = `mongodb://${db.host}:${db.port}`;

// =========================================
//         CONNECT TO MONGODB
// =========================================
mongoose
    .connect(url, {
        dbName: db.name,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("🟢 Connected to MongoDB\n");
    })
    .catch((error) => {
        console.error("🔴 Error connecting to MongoDB: ", error);
    });
