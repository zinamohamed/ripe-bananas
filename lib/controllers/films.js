const { Router } = require('express')
const Film = require('../models/Film')


module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const response = await Film.create(req.body)
            res.send(response)         
        } catch (error) {
            next(error)
        }
    })