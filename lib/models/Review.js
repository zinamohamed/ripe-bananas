const sequelize = require('../utils/sequelize');
const { Model, DataTypes } = require('sequelize');

class Review extends Model {};

Review.init({
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1,
        max: 5
    },
    reviewer: {
        type: DataTypes.BIGINT,
        allowNull: false,
    },
    review: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    film: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
},
{
    sequelize
});

module.exports = Review;