const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');

class Genero extends Model {}
Genero.init({
    imagen: DataTypes.BLOB,
    nombre: DataTypes.STRING,
},{
    sequelize,
    modelName: "genero",
    timestamps: false
})

module.exports = Genero;