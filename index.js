const express = require("express")
const morgan = require("morgan")
const ip = require("ip")

console.clear()
require("./db-connection")

// =========================================
//        CONSTANTS & CONFIGARATIONS
// =========================================
const port = process.env.PORT || 3000

const app = express()

app.use(morgan("common"))

// =========================================
//                  ROUTES
// =========================================
app.get("/api/auth/register", (req, res, next) => {
    res.json("THis is register route")
})

// =========================================
//                  LISTEN
// =========================================
app.listen(port, () => {
    console.log(`🟢 http://${ip.address()}:${port}`)
    console.log(`🟢 http://localhost:${port}`)
})