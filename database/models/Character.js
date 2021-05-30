const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');


class Personaje extends Model {}
Personaje.init({
    imagen: DataTypes.BLOB,
    nombre: DataTypes.STRING,
    edad: DataTypes.INTEGER,
    peso: DataTypes.FLOAT,
    historia: DataTypes.TEXT, 
},{
    sequelize,
    modelName: "personaje"
    //timestamps: false
})

module.exports = Personaje;
