const { Router } = require('express')
const Studio = require('../models/Studio')


module.exports = Router()
    .post('/', async (req, res, next) => {
        const response = await Studio.create(req.body)
        res.send(response)
    })