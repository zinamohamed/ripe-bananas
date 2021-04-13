const request = require('supertest');
const app = require('../lib/app');
const seed = require('../lib/utils/seed');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas studios routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    beforeEach(async () => {
        await seed();
    });
    
    const studio = {
            name: "Zina's Production Haus",
            city: 'New Orleans',
            state: 'LA',
            country: 'United States',
        }
    
    it('should create a new studio and inserts into database', () => {
        return request(app)
            .post('/api/v1/studios')
            .send(studio)
            .then((res) => {
                expect(res.body).toEqual({
                    id: 4,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    ...studio,
                });
            });
    });
    it('should get all studios from database', async () => {
        const response = await request(app)
            .get('/api/v1/studios')
        const expectation = [
            {
                id: 1,
                updatedAt: expect.any(String),
                createdAt: expect.any(String),
                name: "Paramount",
                city: "los Angeles",
                state: "California",
                country: "United States"
            },
            {
                id: 2,
                updatedAt: expect.any(String),
                createdAt: expect.any(String),
                name: "Disney",
                city: "San Paulo",
                state: "NA",
                country: "Brazil"
            },
            {
                id: 3,
                updatedAt: expect.any(String),
                createdAt: expect.any(String),
                name: "A24",
                city: "Denver",
                state: "Colorado",
                country: "United States"
            },
        ]
        expect(response.body).toEqual(expectation);
    });
    it('should get one studio by id', async () => {
        const response = await request(app)
            .get('/api/v1/studios/2')
            const expectation =             {
                id: 2,
                updatedAt: expect.any(String),
                createdAt: expect.any(String),
                name: "Disney",
                city: "San Paulo",
                state: "NA",
                country: "Brazil"
            }
        expect(response.body).toEqual(expectation);
            
    })
});
