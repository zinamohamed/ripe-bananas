const request = require('supertest');
const app = require('../lib/app');
const seed = require('../lib/utils/seed');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas film routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    beforeEach(async () => {
        await seed();
    });
    const film = {
        title: "Clockwork Orange",
        released: 1976,
        StudioId: 1,
        cast: [
            {
                actor: 1,
                role: "Johnny"
            },
            {
                actor: 3,
                role: "Jimmy"
            }
        ]
    }

    it('should create a new film and insert it into the db', () => {
        return request(app)
            .post('/api/v1/films')
            .send(film)
            .then((res) => {
                expect(res.body).toEqual({
                    id: 4,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    ...film,
                });
            });
    });
    it('should get ALL films', async () => {
        await request(app).post('/api/v1/films/batch').send(film);
        const response = await request(app).get('/api/v1/films');
        const allFilms = [
            {
                id: 1,
                title: "Groundhog's Day",
                released: 1980,
                StudioId: 1,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                cast: [
                    {
                        actor: 1,
                        role: "Groundhog"
                    },
                ]
            },
            {
                id: 2,
                title: "Star Wars",
                released: 1995,
                StudioId: 3,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                cast: [
                    {
                        actor: 2,
                        role: "Han Solo"
                    },
                    {
                        actor: 3,
                        role: "Jabba the Hut"
                    }
                ]
            },
            {
                id: 3,
                title: "The Shining",
                released: 1900,
                StudioId: 2,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                cast: [
                    {
                        actor: 1,
                        role: "Jack"
                    },
                    {
                        actor: 4,
                        role: "Jill"
                    }
                ]
            },
        ];
        expect(response.body).toEqual(allFilms);
    });
    it('should get one film by id', async () => {
        const response = await request(app).get('/api/v1/films/1');

        const filmById = {
            id: 1,
            title: "Groundhog's Day",
            released: 1980,
            StudioId: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            cast: [
                {
                    actor: 1,
                    role: "Groundhog"
                },
            ]
        };
        expect(response.body).toEqual(filmById);
    });
});
