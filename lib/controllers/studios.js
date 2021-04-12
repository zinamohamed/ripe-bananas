const { Router } = require('express')
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
            const response = await Studio.findAll();
            res.send(response);
        } catch (error) {
            next(error)
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const response = await Studio.findByPk(req.params.id);
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