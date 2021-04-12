const sequelize = require('../utils/sequelize');
const { Model, DataTypes } = require('sequelize')

class Studio extends Model {};

Studio.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
});

module.exports = Studio;
