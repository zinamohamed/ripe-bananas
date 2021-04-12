const { Router } = require('express')
const Reviewer = require('../models/Reviewer')


module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const response = await Reviewer.create(req.body)
            res.send(response)         
        } catch (error) {
            next(error)
        }
    })
    .get('/', async (req,res,next) => {
        try {
            const response = await Reviewer.findAll();
            res.send(response);
        } catch (error) {
            next(error)
        }
    })
