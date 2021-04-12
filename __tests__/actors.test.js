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
            dob: expect.any(Date),
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
                    name: 'Angelina Jolie',
                    dob: '1975-06-04T07:00:00.000Z',
                    pob: 'Los Angeles',
                });
            });
    });
});