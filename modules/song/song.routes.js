const router = require('express').Router()
const SongController = require('./song.controller')
const song = new SongController()

router.get('/seeds', (req, res) => {
    song.seeds()
    res.send('Seeds created')
})

router.get('/', (req, res) => res.json(song.find()))

router.get('/:id', (req, res) => res.json(song.findOne(req.params.id)))

router.post('/', (req, res) => res.status(201).json(song.create(req.body)))

router.patch('/:id', (req, res) => res.json(song.update(req.params.id, req.body)))

router.delete('/:id', (req, res) => {
    song.delete(req.params.id)
    res.status(204).end()
})

module.exports = router