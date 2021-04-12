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
    .post('/batch', async (req, res, next) => {
      try {
          const response = await Actor.bulkCreate(req.body);
          res.send(response);            
      } catch (error) {
          
      }
  })
    .get('/', async (req, res, next) => {
      try {
        const response = await Actor.findAll();
        res.send(response);
    } catch (error) {
        next(error)
    }
})