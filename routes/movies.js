const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Personaje = require('../database/models/Character');
const Pelicula = require('../database/models/Movie');
const jwt = require('jsonwebtoken');


//LIST MOVIES
router.get('/movies',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Pelicula.findAll({
                attributes:{
                    exclude:['calificacion']
                }
            }).then(peliculas => {
                
                res.json(peliculas);
            });
        }
    })
    
});

// CREATE MOVIE
router.post('/create',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Pelicula.create({
                imagen: req.body.imagen,
                titulo: req.body.titulo,
                fecha_creacion: req.body.fecha_creacion,
                calificacion: req.body.calificacion
            }).then(movie =>{
                res.json(movie);
            });
        }
    })
    
});

//UPDATE MOVIE BY ID
router.patch('/update/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Pelicula.update({
                imagen: req.body.imagen,
                titulo: req.body.titulo,
                fecha_creacion: req.body.fecha_creacion,
                calificacion: req.body.calificacion     
            }, {
                where: {
                    id: req.params.id
                }
            }).then(result => {
                res.json(result);
            });
        }
    })
    
});

//DELETE MOVIE BY ID
router.delete('/delete/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Pelicula.destroy({
                where:{
                    id: req.params.id
                }
            }).then(result =>{
                res.json(result);
            });
        }
    })
    
});

//DETAIL MOVIE BY ID
router.get(('/:id'),verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Pelicula.findByPk(req.params.id).then(pelicula =>{
                res.json(pelicula);
            });
        }
    })
    
});

router.get('/filter',verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Movie.findAll({
                where:{
                    titulo: {
                        [Op.eq]: req.query.titulo
                    }
                }
            }).then(pelicula =>{
                res.json(pelicula);
            })
             
        }
    })
});

function verifyToken(req,res,next){
    const BearerHeader = req.headers['authorization'];
    
    if(typeof BearerHeader !== 'undefined'){
        const bearerToken = BearerHeader.split(" ")[1];
        req.token = bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }

    }

module.exports = router;