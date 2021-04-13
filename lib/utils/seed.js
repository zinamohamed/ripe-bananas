const Actor = require('../models/Actor');
const Film = require('../models/Film');
const Reviewer = require('../models/Reviewer')
const Review = require('../models/Review')
const Studio = require('../models/Studio')


module.exports = async () => {
    await Actor.bulkCreate([
        {
            name: "Jack Nicholson",
            dob: "1975-06-04T07:00:00.000Z",
            pob: "Los Angeles"
        },
        {
            name: "Catherine Zeta Jones",
            dob: "1972-06-04T07:00:00.000Z",
            pob: "Ohio"
        },
        {
            name: "David Duchuvony",
            dob: "1972-06-04T07:00:00.000Z",
            pob: "Florida"
        },
        {
            name: "Meryl Streep",
            dob: "1943-06-04T07:00:00.000Z",
            pob: "Minnesota"
        }
    ]);

    await Studio.bulkCreate([
        {
            name: "Paramount",
            city: "los Angeles",
            state: "California",
            country: "United States"
        },
        {
            name: "Disney",
            city: "San Paulo",
            state: "NA",
            country: "Brazil"
        },
        {
            name: "A24",
            city: "Denver",
            state: "Colorado",
            country: "United States"
        },
    ]);

    await Film.bulkCreate([
        {
            title: "Groundhog's Day",
            released: 1980,
            StudioId: 1,
            cast: [
                {
                    actor: 1,
                    role: "Groundhog"
                },
            ]
        },
        {
            title: "Star Wars",
            released: 1995,
            StudioId: 3,
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
            title: "The Shining",
            released: 1900,
            StudioId: 2,
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
    ]);

    await Reviewer.bulkCreate([
        {
            name: "Fred Lipski",
            company: "New York Times"
        },
        {
            name: "Julia Rothenchilds",
            company: "LA Tribune"
        },
        {
            name: "Stimpy",
            company: "Bad Review Blog"
        },
    ]);

await Review.bulkCreate([
    {
        rating: 5,
        review: "This is great",
        FilmId: 2,
        ReviewerId: 1 
    },
    {
        rating: 2,
        review: "This movie sucks",
        FilmId: 1,
        ReviewerId: 2 
    },
    {
        rating: 4,
        review: "This movie is ok",
        FilmId: 3,
        ReviewerId: 3 
    }

]);


}