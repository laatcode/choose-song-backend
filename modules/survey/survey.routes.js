const router = require('express').Router()
const validatorHandler = require('../../middlewares/validatorHandler')
const surveySchemas = require('./survey.schema')
const SurveyController = require('./survey.controller')

router.get('/seeds', (req, res) => {
    SurveyController.seeds()
    res.send('Seeds created')
})

router.get('/', (req, res) => res.json(SurveyController.find()))

router.get('/:id', validatorHandler(surveySchemas.getSurveySchema, 'params'), (req, res) => res.json(SurveyController.findOne(req.params.id)))

router.post('/', validatorHandler(surveySchemas.createSurveySchema, 'body'), (req, res) => res.status(201).json(SurveyController.create(req.body)))

router.patch('/:id', validatorHandler(surveySchemas.getSurveySchema, 'params'), validatorHandler(surveySchemas.updateSurveySchema, 'body'), (req, res) => res.json(SurveyController.update(req.params.id, req.body)))

router.delete('/:id', validatorHandler(surveySchemas.getSurveySchema, 'params'), (req, res) => {
    SurveyController.delete(req.params.id)
    res.status(204).end()
})

module.exports = router