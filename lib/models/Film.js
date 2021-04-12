const sequelize = require('../utils/sequelize');
const { Model, DataTypes } = require('sequelize')

class Film extends Model {};

Film.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    studio: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    released: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
},
{
    sequelize,
});

module.exports = Film;