const sequelize = require('../utils/sequelize');
const { Model, DataTypes } = require('sequelize')

class Reviewer extends Model {};

Reviewer.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
{
    sequelize,
});

module.exports = Reviewer;
