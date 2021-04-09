const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  const studio = {
    name: "Zina's Production Haus",
    city: 'New Orleans',
    state: 'LA',
    country: 'United States',
  }
  it('should creates a new studio and inserts into database', () => {
    return request(app)
      .post('/api/v1/studios')
      .send(studio)
      .then(res => {
        expect(res.body).toEqual({
          id: 1,
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
          ...studio
        })
      })
  })
});
