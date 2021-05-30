const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');


class Usuario extends Model {}
Usuario.init({
    nombre: DataTypes.STRING,
    email: DataTypes.STRING,
},{
    sequelize,
    modelName: "usuario",
    //timestamps: false
})

module.exports = Usuario;