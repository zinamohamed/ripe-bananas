const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');
const seed = require('../lib/utils/seed')

describe('ripe-bananas reviews routes', () => {
    beforeEach(() => { 
        return db.sync({ force: true });
    });
    beforeEach( async() => {
        await seed();
    })
    const review = {
        rating: 2,
        review: "It was ok",
        FilmId: 2,
        ReviewerId: 3
    }

    it('should post a review to the reviews table', async () => {
        const response = await request(app)
            .post('/api/v1/reviews')
            .send(review)

        const expectation = {
            id: 4,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            ...review 
        }
        expect(response.body).toEqual(expectation);
    })      
    it('should return the top 100 reviews', async () => {
        const response = await request(app)
            .get('/api/v1/reviews')
        const expectation = [
            {
                id: 1,
                rating: 5,
                review: "This is great",
                FilmId: 2,
                ReviewerId: 1,
                createdAt: expect.any(String), 
                updatedAt: expect.any(String), 
            },
            {
                id: 2,
                rating: 2,
                review: "This movie sucks",
                FilmId: 1,
                ReviewerId: 2,
                createdAt: expect.any(String), 
                updatedAt: expect.any(String), 
            },
            {
                id: 3,
                rating: 4,
                review: "This movie is ok",
                FilmId: 3,
                ReviewerId: 3,
                createdAt: expect.any(String), 
                updatedAt: expect.any(String), 
            }
            ];
        expect(response.body).toEqual(expectation);
    })  
});