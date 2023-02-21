const notFound = (req, res, next) => {
    res.status(404);
    const error = new Error("Not found the page that you are looking for");
    next(error);
};

const errorHandling = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    const message = err.message || "Internal server error";
    const stack = err.stack;
    res.status(statusCode).json({
        message,
        stack,
    });
};

module.exports = { notFound, errorHandling };
