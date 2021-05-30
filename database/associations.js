const Personaje = require('./models/Character');
const Pelicula = require('./models/Movie');
const Genero = require('./models/Genre');

//Genero.hasOne(Pelicula);

Personaje.belongsToMany(Pelicula, {through: "personaje_pelicula"});
Pelicula.belongsToMany(Personaje, {through: "personaje_pelicula"});