const sequelize = require('../utils/sequelize');
const { Model, DataTypes } = require('sequelize')

class Actor extends Model {};

Actor.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dob: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    pob: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
{
    sequelize,
});

module.exports = Actor;