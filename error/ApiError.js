class ApiError extends Error{
    constructor(status, message) {
        super();
        this.status = status
        this.message = message
    }

    static badRequest(message){
        return new ApiError(404, message)
    }

    static interanl(message){
        return new ApiError(500)
    }
}


module.exports = ApiError