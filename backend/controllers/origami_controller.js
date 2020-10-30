const mongoose= require('mongoose');
const jwt = require('jsonwebtoken');
const origami = require('../src/origami');

        module.exports = {
            createOrigami(req,res,next){
                const origami = new Origami({// schema de données
                    
                    OrigamiName: req.body.OrigamiName,
                    OrigamiPic:req.body.OrigamiPic,
                    OrigamiDiag: req.body.OrigamiDiag
                
            });
            console.log(req.body)
            
            origami.save()
            .then(() => res.sendStatus(201).json({ message: 'origami créé !' }))
            .catch(error => res.sendStatus(400).json({ error }));
            }
        
        };



 
