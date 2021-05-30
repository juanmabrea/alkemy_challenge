const { Op } = require("sequelize");
const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Personaje = require('../database/models/Character');
const Pelicula = require('../database/models/Movie');
const jwt = require('jsonwebtoken');
//require('../authController/authFunctions')();

// CREATE CHARACTER
router.post('/',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Personaje.create({
                imagen: req.body.imagen,
                nombre: req.body.nombre,
                edad: req.body.edad,
                peso: req.body.peso,
                historia: req.body.historia,
                }).then(personaje =>{
                res.json(personaje);
            });
        
        }
    })
});

//LIST CHARACTERS
router.get('/',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Personaje.findAll({
                attributes:{
                    exclude:['peso','edad','historia','id']
                }
            }).then(personajes => {
                
                res.json(personajes);
            });
          
        }
    })
});


//DETAIL CHARACTER BY ID
router.get(('/:id'),verifyToken,(req,res)=>{
    Personaje.findByPk(req.params.id).then(personaje =>{
        res.json(personaje);
    });
});


//UPDATE CHARACTER BY ID
router.patch('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Personaje.update({
                imagen: req.body.imagen,
                nombre: req.body.nombre,
                edad: req.body.edad,
                peso: req.body.peso,
                historia: req.body.historia ,       
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

//DELETE CHARACTER BY ID
router.delete('/:id',verifyToken,(req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Personaje.destroy({
                where:{
                    id: req.params.id
                }
            }).then(result =>{
                res.json(result);
            });
            
        }
    })
    
});

//FILTER CHARACTER
router.get('/filter',verifyToken, (req,res)=>{
    jwt.verify(req.token, 'secretkey',function(err,data){
        if(err){
            res.sendStatus(403);
        } else{
            Personaje.findAll({
                where:{
                    nombre: {
                        [Op.eq]: req.query.nombre
                    },
                    edad:{
                        [Op.eq]: req.query.edad
                    },
                    peso:{
                        [Op.eq]: req.query.peso
                    }
                }
            }).then(personaje =>{
                res.json(personaje);
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