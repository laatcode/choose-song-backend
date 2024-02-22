const artistRoutes = require('../modules/artist/artist.routes')
const songRoutes = require('../modules/song/song.routes')
const surveyRoutes = require('../modules/survey/survey.routes')
const router = require('express').Router()

const routes = app => {
    app.use('/api/v1', router)
    router.use('/artists', artistRoutes)
    router.use('/songs', songRoutes)
    router.use('/surveys', surveyRoutes)
}

module.exports = routes