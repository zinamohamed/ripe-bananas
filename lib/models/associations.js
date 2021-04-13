const Actor = require('./Actor')
const Film = require('./Film')
const Review = require('./Review')
const Reviewer = require('./Reviewer')
const Studio = require('./Studio')

Studio.hasMany(Film);
Film.belongsTo(Studio);
Film.belongsToMany(Actor, {through: 'Actor_Film'});
Actor.belongsToMany(Film, {through: 'Actor_Film'});
Review.belongsTo(Reviewer);
Film.hasMany(Review);
Review.belongsTo(Film);
Reviewer.hasMany(Review);

