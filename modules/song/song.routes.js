const router = require('express').Router()
const validatorHandler = require('../../middlewares/validatorHandler')
const songSchemas = require('./song.schema')
const SongController = require('./song.controller')
const song = new SongController()

router.get('/seeds', (req, res) => {
    song.seeds()
    res.send('Seeds created')
})

router.get('/', (req, res) => res.json(song.find()))

router.get('/:id', validatorHandler(songSchemas.getSongschema, 'params'), (req, res) => res.json(song.findOne(req.params.id)))

router.post('/', validatorHandler(songSchemas.createSongSchema, 'body'), (req, res) => res.status(201).json(song.create(req.body)))

router.patch('/:id', validatorHandler(songSchemas.getSongschema, 'params'), validatorHandler(songSchemas.updateSongSchema, 'body'), (req, res) => res.json(song.update(req.params.id, req.body)))

router.delete('/:id', validatorHandler(songSchemas.getSongschema, 'params'), (req, res) => {
    song.delete(req.params.id)
    res.status(204).end()
})

module.exports = router