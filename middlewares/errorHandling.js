const errorHandling = (err, req, res, next) => {
    const statusCode = req.status(res.statusCode || 500);
    const message = err.message || "Internal server error";
    const stack = err.stack;
    res.status(statusCode).json({
        message,
        stack,
    });
};

const notFound = (req, res, next) => {
    res.status(404).json("Not found the page that you are looking for");
};

module.exports = { notFound, errorHandling };
