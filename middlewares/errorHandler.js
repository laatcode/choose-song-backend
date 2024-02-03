const errorHandler = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        method: req.method,
        path: req.url,
        message: err.message
    })
}

module.exports = errorHandler