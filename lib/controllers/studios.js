const { Router } = require('express');
const Film = require('../models/Film');
const Studio = require('../models/Studio')


module.exports = Router()
    .post('/', async (req, res, next) => {
        try {
            const response = await Studio.create(req.body);
            res.send(response);         
        } catch (error) {
            next(error)
        }
    })
    .post('/batch', async (req, res, next) => {
        try {
            const response = await Studio.bulkCreate(req.body);
            res.send(response);            
        } catch (error) {
            
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const response = await Studio.findAll({
                attributes: ["id", "name"]
            });
            res.send(response);
        } catch (error) {
            next(error)
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const response = await Studio.findByPk(req.params.id, {
                attributes: ["id", "name", "city", "state", "country"],
                include: {
                    model: Film,
                    attributes: ["id", "title"]
                }
            });
            res.send(response);
        } catch (error) {
            next(error);
        }
    })
    // .delete('/:id', async (req, res, next) => {
    //     try {
    //         const response = await Studio.destroy(req.params.id);
    //         res.send(response);
    //     } catch (error) {
    //         next(error);
    //     }
    // })