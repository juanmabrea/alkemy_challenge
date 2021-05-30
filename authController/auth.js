const { Router } = require('express');
const express = require('express');
const router = express.Router();
const Usuario = require('../database/models/User');
const jwt = require('jsonwebtoken');
const apiKey = "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";
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(apiKey);



router.post('/login',(req,res) => {
    const userFound = Usuario.findOne({where: {email: req.body.email}});
    
    if(userFound == null){
        return res.status(400).json({message: "user not found"})
    }else{
        jwt.sign({Usuario}, 'secretkey',(err,token) => {
            res.json({
                token 
            });
        });
    }

});

router.post('/register',(req,res)=>{
    Usuario.create({
        nombre: req.body.nombre,    
        email: req.body.email, 
    });
    
    const welcomeMsg = {
        to: req.body.email,
        from: "juanmanuelbrea1999@gmail.com",
        subject: "welcome",
        text: "successfull register",
        html: "<strong>successfull<strong>",
    };
    sgMail.send(welcomeMsg);

    jwt.sign({Usuario}, 'secretkey',(err,token) => {
        res.json({
            token
        }); 
    });
    
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