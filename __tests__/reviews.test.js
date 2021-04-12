const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas reviews routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    const reviews = [
        {
            rating: 4,
            reviewer: '1',
            review: "Great film, would see again",
            film: '1'
        },
        {
            rating: 2,
            reviewer: '2',
            review: "Very bad movie",
            film: '2'
        }
    ]
    it('should post a review to the reviews table', async () => {
        const response = await request(app)
            .post('/api/v1/reviews')
            .send(reviews[0])
        const expectation = {
            id: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            ...reviews[0] 
        }
        expect(response.body).toEqual(expectation);
    })      
    it('should return the top 100 reviews', async () => {
        await request(app)
            .post('/api/v1/reviews')
            .send(reviews[0])
        await request(app)
            .post('/api/v1/reviews')
            .send(reviews[1])
        const response = await request(app)
            .get('/api/v1/reviews')
        const expectation = [
            {
                id: 1,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...reviews[0] 
            },
            {
                id: 2,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...reviews[1] 
            }];
        expect(response.body).toEqual(expectation);
    })  
});