const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(2).max(60)
const artistId = Joi.string().uuid()

const getSongschema = Joi.object({
    id: id.required()
})

const createSongSchema = Joi.object({
    name: name.required(),
    artistId: artistId.required()
})

const updateSongSchema = Joi.object({
    name: name,
    artistId: artistId
})

module.exports = {
    getSongschema,
    createSongSchema,
    updateSongSchema
}