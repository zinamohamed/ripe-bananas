const { Router } = require('express')
const Review = require('../models/Review')

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const response = await Review.create(req.body);
            res.send(response);
        } catch (error) {
            next(error);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const response = await Review.findAll({limit: 100});
            res.send(response);
        } catch (error) {
            next(error);
        }
    })