const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas film routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    const film = [
        {
            title: 'Mean Girls',
            studio: 5,
            released: 2004,
        },
        {
            title: 'Eternal Sunshine of the Spotless Mind',
            studio: 2,
            released: 2004,
        }
    ];

    it('should create a new film and insert it into the db', () => {
      return request(app)
          .post('/api/v1/films')
          .send(film[0])
          .then((res) => {
              expect(res.body).toEqual({
                  id: 1,
                  createdAt: expect.any(String),
                  updatedAt: expect.any(String),
                  ...film[0],
              });
          });
    });
});