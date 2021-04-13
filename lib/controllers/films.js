const { Router } = require('express');
const Film = require('../models/Film');
const Studio = require('../models/Studio')

module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const response = await Film.create(req.body);
            res.send(response);
        } catch (error) {
            next(error);
        }
    })
    .post('/batch', async (req, res, next) => {
        try {
            const response = await Film.bulkCreate(req.body);
            res.send(response);
        } catch (error) {
            next(error)
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const response = await Film.findAll({
                attributes: ["id", "title", "released"],
                include: {
                    model: Studio,
                    attributes: ["id", "name"]
                }
            });
            res.send(response);
        } catch (error) {
            next(error);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const response = await Film.findByPk(req.params.id);
            res.send(response);
        } catch (error) {
            next(error);
        }
    });
