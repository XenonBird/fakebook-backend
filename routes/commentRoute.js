const commentRoutes = require("express").Router();

commentRoutes.all("/", (req, res) =>
    res.status(200).json("This route is not ready yet")
);

module.exports = commentRoutes;
