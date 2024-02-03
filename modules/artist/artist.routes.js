const router = require('express').Router()
const validatorHandler = require('../../middlewares/validatorHandler')
const artistSchemas = require('./artist.schema')
const ArtistController = require('./artist.controller')
const artist = new ArtistController()

router.get('/seeds', (req, res) => {
    artist.seeds()
    res.send('Seeds created')
})

router.get('/', (req, res) => res.json(artist.find()))

router.get('/:id', validatorHandler(artistSchemas.getArtistSchema, 'params'), (req, res) => res.json(artist.findOne(req.params.id)))

router.post('/', validatorHandler(artistSchemas.createArtistSchema, 'body'), (req, res) => res.status(201).json(artist.create(req.body)))

router.patch('/:id', validatorHandler(artistSchemas.getArtistSchema, 'params'), validatorHandler(artistSchemas.updateArtistSchema, 'body'), (req, res) => res.json(artist.update(req.params.id, req.body)))

router.delete('/:id', validatorHandler(artistSchemas.getArtistSchema, 'params'), (req, res) => {
    artist.delete(req.params.id)
    res.status(204).end()
})

module.exports = router