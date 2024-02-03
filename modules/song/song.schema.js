const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(2).max(60)
const artist = Joi.string().min(2).max(60)

const getSongschema = Joi.object({
    id: id.required()
})

const createSongSchema = Joi.object({
    name: name.required(),
    artist: artist.required()
})

const updateSongSchema = Joi.object({
    name: name,
    artist: artist
})

module.exports = {
    getSongschema,
    createSongSchema,
    updateSongSchema
}