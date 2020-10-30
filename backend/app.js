const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const app = express();
const path = require('path');

const routRoutes=require('./routes/rout');
//const userRoutes = require('./routes/user');
//const origami_controllerRoutes = require('../routes/origami');





mongoose.connect('mongodb+srv://gladys:Auxane@2016@cluster0.svqm5.mongodb.net/Origami?retryWrites=true&w=majority',// connexion à la base de donnée
  { useNewUrlParser: true,
    useUnifiedTopology: true })
 
    mongoose.connection.once('open',()=>{
        console.log('connexion établie')
    })
.on('error',(error)=>{
    console.log('connexion echouée' + error)
})

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());
  
  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/origami', routRoutes);
  app.use('/api/auth', routRoutes);
  app.use('/api/categorie',routRoutes)

  module.exports = app;


  

  
  

