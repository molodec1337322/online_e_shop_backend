const ApiError = require("../error/ApiError")

function errorHandlingMiddleware (err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json({message: err.message})
    }
    return res.status(500).json({message: "uncatched error!"})
}

module.exports = errorHandlingMiddleware
