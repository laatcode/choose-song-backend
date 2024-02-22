const { faker, th } = require('@faker-js/faker')
const {v4: uuid} = require('uuid')
const CustomError = require('../../CustomError')
const SongController = require('../song/song.controller')

class SurveyController {

    static surveys = []
    
    static seeds() {

        if(!SongController.find().length) {
            SongController.seeds()
        }

        for (let i = 0; i < 100; i++) {
            let songs = []
            const minSongsQty = 2
            const maxSongsQty = 5
            const songQty = Math.floor(Math.random() * (maxSongsQty-minSongsQty)) + minSongsQty

            for (let i = 0; i < songQty; i++) {
                songs.push({
                    id: SongController.songs[Math.floor(Math.random() * SongController.songs.length)].id
                })
            }
            
            this.surveys.push({
                id: faker.string.uuid(),
                name: faker.word.words(4),
                description: faker.word.words(10),
                songs
            })
        }
    }

    static find() {
        const surveys = this.surveys.map(survey => ({
            ...survey,
            songs: survey.songs.map(song => SongController.findOne(song.id))
        }))

        return surveys
    }

    static findIndex(id) {
        const index = this.surveys.findIndex(survey => survey.id === id)

        if(index === -1) {
            throw new CustomError("Encuesta no encontrada", 404)
        }

        return index
    }

    static findOne(id) {
        const foundSurvey = this.surveys[this.findIndex(id)]

        return {
            ...foundSurvey,
            songs: foundSurvey.songs.map(song => SongController.findOne(song.id))
        }
    }

    static create(data) {
        data.songs.forEach(song => SongController.findOne(song.id))

        const newSurvey = {
            ...data,
            id: uuid()
        }

        this.surveys.push(newSurvey)

        return this.findOne(newSurvey.id)
    }

    static update(id, data) {
        
        if(data.songs) {
            data.songs.forEach(song => {
                SongController.findOne(song.id)
            })
        }

        const foundSurvey = this.findOne(id)

        const surveyUpdated = {
            ...foundSurvey,
            ...data,
            id: foundSurvey.id
        }

        this.surveys = this.surveys.filter(survey => survey.id !== id)
        this.surveys.push(surveyUpdated)

        return this.findOne(id)
    }

    static delete(id) {
        this.findOne(id)
        this.surveys = this.surveys.filter(survey => survey.id !== id)
    }
}

module.exports = SurveyController