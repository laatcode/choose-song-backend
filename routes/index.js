const songRoutes = require('../modules/song/song.routes')
const router = require('express').Router()

const routes = app => {
    app.use('/api/v1', router)
    router.use('/songs', songRoutes)
}

module.exports = routes