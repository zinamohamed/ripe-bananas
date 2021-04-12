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
            rating: 4,
            reviewer: '1',
            review: "Great film, would see again",
            film: '1'
        }
        expect(response).toEqual(expectation);
    })  

});