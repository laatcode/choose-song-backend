class CustomError {
    constructor(message, statusCode = 500) {
        this.message = message
        this.statusCode = statusCode
        this.isCustom = true
    }
}

module.exports = CustomError