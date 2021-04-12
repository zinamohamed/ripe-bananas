const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    const studio = [
        {
            name: "Zina's Production Haus",
            city: 'New Orleans',
            state: 'LA',
            country: 'United States',
        },
        {
            name: "Dylan's Montana Special Steakhouse Production Nightmare",
            city: "Missoula",
            state: "MT",
            country: 'United States'
        }
    ];
    it('should creates a new studio and inserts into database', () => {
        return request(app)
            .post('/api/v1/studios')
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
    it('should get all studios from database', async () => {
        await request(app)
            .post('/api/v1/studios/batch')
            .send(studio)
        const response = await request(app)
            .get('/api/v1/studios')
        const expectation = [
            {
                id: 1,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...studio[0],
            },
            {
                id: 2,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...studio[1],
            }
        ]
        expect(response.body).toEqual(expectation);
    });
    it('should get one studio by id', async () => {
        await request(app)
            .post('/api/v1/studios/batch')
            .send(studio)
        const response = await request(app)
            .get('/api/v1/studios/2')
            const expectation = 
                {
                    id: 2,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    ...studio[1],
                }
        expect(response).toEqual(expectation);
            
    })
});
