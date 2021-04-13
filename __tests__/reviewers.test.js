const request = require('supertest');
const app = require('../lib/app');
const seed = require('../lib/utils/seed');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas routes', () => {
    beforeEach(() => {
        return db.sync({force: true});
    });

    beforeEach(async () => {
        await seed();
    });

    const reviewer = {
        name: "Silly Willy",
        company: "LA Times"
    }
    it('posts a new reviewer to the db', () => {
        return request(app)
        .post('/api/v1/reviewers/')
        .send(reviewer)
        .then((res) => {
            expect(res.body).toEqual(
                {
                    id:4, 
                    createdAt: expect.any(String), 
                    updatedAt: expect.any(String), 
                    ...reviewer
                })
        })
    });
    it('gets all the reviewers from the db', () => {
        return request(app)
        .get('/api/v1/reviewers')
        .then((res) => {
            expect(res.body).toEqual([
                {
                    id: 1,
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    name: "Fred Lipski",
                    company: "New York Times"
                },
                {
                    id: 2,
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    name: "Julia Rothenchilds",
                    company: "LA Tribune"
                },
                {
                    id: 3,
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    name: "Stimpy",
                    company: "Bad Review Blog"
                }
            ])
        })
    });
    it('gets a particular reviewer by id', () => {
        return request(app)
        .get('/api/v1/reviewers/3')
        .then((res) => {
            expect(res.body).toEqual(
                {
                    id: 3,
                    updatedAt: expect.any(String),
                    createdAt: expect.any(String),
                    name: "Stimpy",
                    company: "Bad Review Blog"
                })
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
    it('deletes a reviewer from the db', () => {
        return request(app)
        .delete('/api/v1/reviewers/2')
        .then((res) => {
            expect(res.body).toEqual({success: true})
        })
    })
})
