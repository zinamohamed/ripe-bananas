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
    it('posts a group of new reviewers to the db', () => {
        return request(app)
        .post('/api/v1/reviewers/batch')
        .send(reviewers)
        .then((res) => {
            expect(res.body).toEqual([
                {id:2, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[0]},
                {id:3, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[1]}
            ])
        })
    });
    it('gets all the reviewers from the db', () => {
        return request(app)
        .get('/api/v1/reviewers/')
        .then((res) => {
            expect(res.body).toEqual([
                {id:1, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[0]},
                {id:2, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[0]},
                {id:3, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[1]},
            ])
        })
    });
    it('gets a particular reviewer by id', () => {
        return request(app)
        .get('/api/v1/reviewers/3')
        .then((res) => {
            expect(res.body).toEqual({id: 3, createdAt: expect.any(String), updatedAt: expect.any(String), ...reviewers[1]})
        })
    });
    it('updates a particular reviewer by id', () => {
        return request(app)
        .put('/api/v1/reviewers/3')
        .send({name: 'third reviewer', company: 'review shack'})

        .then((res) => {
            expect(res.body[1][0]).toEqual({id: 3, name:'third reviewer', company: 'review shack', createdAt: expect.any(String), updatedAt: expect.any(String)})
        })
        
    });
})
