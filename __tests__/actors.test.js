const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas actor routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    const actor = [
        {
            name: 'Angelina Jolie',
            dob: '1975-06-04T07:00:00.000Z',
            pob: 'Los Angeles'
        },
        {
            name: 'Denzel Washington',
            dob: '1954-12-28T07:00:00.000Z',
            pob: 'Mount Vernon'
        }
    ];
    
    it('should create a new actor and insert it into the db', () => {
        return request(app)
            .post('/api/v1/actors')
            .send(actor[0])
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    ...actor[0],
                });
            });
      });
    
    
    it('should get all actors from database', () => {
        return request(app)
            .post('/api/v1/actors/batch')
            .send(actor)
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        id: 1,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        ...actor[0],
                    },
                    {
                        id: 2,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        ...actor[1],
                    }
            ]);
        });
    });
    
    it('should get one actor by id', async () => {
      await request(app)
          .post('/api/v1/actors/batch')
          .send(actor)
      const response = await request(app)
          .get('/api/v1/actors/1')
          const actorById = 
              {
                  id: 1,
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                  ...actor[0],
              }
      expect(response.body).toEqual(actorById);
  })
});