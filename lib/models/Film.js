const sequelize = require('../utils/sequelize');
const { Model, DataTypes } = require('sequelize')

class Film extends Model {};

Film.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    released: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    cast: {
        type: DataTypes.ARRAY(DataTypes.JSON),
        allowNull: false
    }
},
{
    sequelize,
});

module.exports = Film;