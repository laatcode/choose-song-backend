const Joi = require('joi')

const id = Joi.string().uuid()
const name = Joi.string().min(2).max(60)
const description = Joi.string().min(2).max(255)
const songId = Joi.string().uuid()
const songs = Joi.array().items(
    Joi.object({
        id: songId.required()
    }).required()
)

const getSurveySchema = Joi.object({
    id: id.required()
})

const createSurveySchema = Joi.object({
    name: name.required(),
    description: description.required(),
    songs: songs.required()
})

const updateSurveySchema = Joi.object({
    name: name,
    description: description,
    songs: songs
})

module.exports = {
    getSurveySchema,
    createSurveySchema,
    updateSurveySchema
}