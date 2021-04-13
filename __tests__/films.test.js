const request = require('supertest');
const app = require('../lib/app');
const db = require('../lib/utils/sequelize');

describe('ripe-bananas film routes', () => {
    beforeEach(() => {
        return db.sync({ force: true });
    });
    const film = [
        {
            title: 'Mean Girls',
            StudioId: 1,
            released: 2004,
            cast: [
                {
                    actor: 1,
                    role: "Meanie 1"
                },
                {
                    actor: 5,
                    role: "Plz work"
                }
            ]
        },
        {
            title: 'Eternal Sunshine of the Spotless Mind',
            StudioId: 2,
            released: 2004,
            cast: [
                {
                    actor: 2,
                    role: "Sunshine"
                },
                {
                    actor: 5,
                    role: "Plz work"
                }
            ]
        },
    ];

    it('should create a new film and insert it into the db', () => {
        return request(app)
            .post('/api/v1/films')
            .send(film[0])
            .then((res) => {
                expect(res.body).toEqual({
                    id: 1,
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    ...film[0],
                });
            });
    });

    it('test /batch route', () => {
        return request(app)
            .post('/api/v1/films/batch')
            .send(film)
            .then((res) => {
                expect(res.body).toEqual([
                    {
                        id: 1,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        ...film[0],
                    },
                    {
                        id: 2,
                        createdAt: expect.any(String),
                        updatedAt: expect.any(String),
                        ...film[1],
                    },
                ]);
            });
    });

    it('should get ALL films', async () => {
        await request(app).post('/api/v1/films/batch').send(film);
        const response = await request(app).get('/api/v1/films');
        const allFilms = [
            {
                id: 1,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...film[0]
            },
            {
                id: 2,
                createdAt: expect.any(String),
                updatedAt: expect.any(String),
                ...film[1]
            },
        ];
        expect(response.body).toEqual(allFilms);
    });
    it.only('should get one film by id', async () => {
        await request(app)
            .post('/api/v1/studios')
            .send({
                name: 'Test Studio',
                city: "Portland",
                state: "Oregon",
                country: "USA"
            })
        await request(app)
            .post('/api/v1/studios')
            .send({
                name: 'Test Studio2',
                city: "Portland",
                state: "Oregon",
                country: "USA"
            })
        await request(app).post('/api/v1/films/batch').send(film);
        const response = await request(app).get('/api/v1/films/1');

        const filmById = {
            id: 1,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            ...film[0],
        };
        expect(response.body).toEqual(filmById);
    });
});
