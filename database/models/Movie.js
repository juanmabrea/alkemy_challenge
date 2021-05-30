const { Model, DataTypes } = require('sequelize');
const sequelize = require('../db');


class Pelicula extends Model {}
Pelicula.init({
    imagen: DataTypes.BLOB,
    titulo: DataTypes.STRING,
    fecha_creacion: DataTypes.DATE,
    calificacion: DataTypes.INTEGER,
},{
    sequelize,
    modelName: "pelicula",
    //timestamps: false
})

module.exports = Pelicula;