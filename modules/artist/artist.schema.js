const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(2).max(60)

const getArtistSchema = Joi.object({
    id: id.required()
})

const createArtistSchema = Joi.object({
    name: name.required(),
})

const updateArtistSchema = Joi.object({
    name: name
})

module.exports = {
    getArtistSchema,
    createArtistSchema,
    updateArtistSchema
}