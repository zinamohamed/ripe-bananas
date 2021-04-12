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
    .post('/batch', async (req, res, next) => {
        try {
            const response = await Reviewer.bulkCreate(req.body);
            res.send(response);            
        } catch (error) {
            
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
    .get('/:id', async (req,res,next) => {
        try {
            const response = await Reviewer.findByPk(req.params.id);
            res.send(response)
        } catch (error) {
            next(error);
        }
    })
    .put('/:id', async (req,res,next) => {
        try {
            const response = await Reviewer.update({
                name: req.body.name, 
                company: req.body.company
            }, {
                where:{ 
                    id: req.params.id
                },
                returning: true});
            res.send(response)
        } catch (error) {
            next(error);
        }
    })
    .delete('/:id', async (req,res,next) => {
        try {
            const response = await Reviewer.destroy({
                where: {
                    id: req.params.id,
                }})
               
            res.send({success: true})
        } catch (error) {
            next(error);
        }
    })
