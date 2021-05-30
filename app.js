const express = require('express');
const app = express();
const sequelize = require('./database/db');
const Personaje = require('./database/models/Character');
const Pelicula = require('./database/models/Movie');
const Genero = require('./database/models/Genre');
const Usuario = require('./database/models/User');
const  jwt = require('jsonwebtoken');

require('./database/associations');



const PORT = process.env.PORT || 3050;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Route
app.get('/',(req,res)=>{
    res.send('welcome to my API!');
});

app.use('/characters', require('./routes/characters'));
app.use('/movies',require('./routes/movies'));
app.use('/auth', require('./authController/auth'));



//check connect



app.listen(PORT, function (){
    console.log(`server running on port ${PORT}`);

    sequelize.sync({ force: false }).then(()=>{
        console.log("se conectó a la bd satisfactoriamente");
    }).catch(error =>{
        console.log('Se ha producido un error', error);
    })
    
})