const CustomError = require("../CustomError")

const validatorHandler = (schema, property) => (req, res, next) => {
    const data = req[property]
    const {error} = schema.validate(data, { abortEarly: false })

    if(error) {
        next(new CustomError(error.message, 400))
    }

    next()
}

module.exports = validatorHandler