const { Router } = require('express')
const Actor = require('../models/Actor')


module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const response = await Actor.create(req.body)
            res.send(response)         
        } catch (error) {
            next(error)
        }
    })