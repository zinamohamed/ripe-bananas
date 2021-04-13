const request = require('supertest');
const app = require('../lib/app');
const seed = require('../lib/utils/seed');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas actor routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });

    beforeEach(async () => {
        await seed();
    });

    const actor = {
        name: 'Angelina Jolie',
        dob: '1975-06-04T07:00:00.000Z',
        pob: 'Los Angeles',
    };

    it('should create a new actor and insert it into the db', () => {
        return request(app)
            .post('/api/v1/actors')
            .send(actor)
            .then((res) => {
                expect(res.body).toEqual({
                    id: 5,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    ...actor,
                });
            });
    });
    it('should get ALL actors', async () => {
        const response = await request(app).get('/api/v1/actors');
        const expectation = [
            {
                id: 1,
                name: 'Jack Nicholson',
            },
            {
                id: 2,
                name: 'Catherine Zeta Jones',
            },
            {
                id: 3,
                name: 'David Duchuvony',
            },
            {
                id: 4,
                name: 'Meryl Streep',
            },
        ];
        expect(response.body).toEqual(expectation);
    });

    it('should get one actor by id', async () => {
        const postRes = await request(app)
            .post('/api/v1/actors/batch')
            .send(actor);
        const response = await request(app).get('/api/v1/actors/1');
        const expectation = {
            id: 1,
            updatedAt: expect.any(String),
            createdAt: expect.any(String),
            name: 'Jack Nicholson',
            dob: '1975-06-04T07:00:00.000Z',
            pob: 'Los Angeles',
        };
        expect(response.body).toEqual(expectation);
    });
});
