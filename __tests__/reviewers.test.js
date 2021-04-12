const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas routes', () => {
    beforeEach(() => {
        return db.sync({forcec: true});
    });
    const reviewers = [
        {
            name: 'first reviewer',
            company: 'review haus'
        },
        {
            name: 'second reviewer',
            company: 'review steakhouse'
        }
    ];
    it('posts a new reviewer to the db', () => {
        return request(app)
        .post('/api/v1/reviewers/')
        .send(reviewers[0])
        .then((res) => {
            expect(res.body).toEqual({id:1, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[0]})
        })
    });
    it('gets all the reviewers from the db', () => {
        return request(app)
        .get('/api/v1/reviewers/')
        .send(reviewers[0])
        .then((res) => {
            expect(res.body).toEqual([{id:1, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[0]}])
        })
    })
})
