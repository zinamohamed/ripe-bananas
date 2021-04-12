const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    const actors = [
        {
            name: 'Angelina Jolie',
            date_of_birth: 'June 4, 1975',
            place_of_birth: 'Los Angeles'
        },
        {
            name: 'Denzel Washington',
            date_of_birth: 'December 28, 1954',
            place_of_birth: 'Mount Vernon'
        }
    ];
    it('should creates a new actor and insert it into the db', () => {
        return request(app)
            .post('/api/v1/actors')
            .send(studio[0])
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    ...studio[0],
                });
            });
    });
});