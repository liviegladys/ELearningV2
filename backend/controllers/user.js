
const bcrypt=require('bcrypt');
const User=require('../src/User');


module.exports={

signup (req, res, next)  {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          UserName:  req.body.UserName,
          UserSurname: req.body.UserSurname,
          UserEmail:req.body.UserEmail,
          password: hash
        });
        user.save((error,user)=>{
if (error){
  res.send(`Utilisateur non créé. Tous les champs doivent être complétés et  ${req.body.UserEmail} ne doit pas correspondre à compte existant`)
}else{
  console.log('compte creer avec succes');
}

        })
          
      })
     
      
  },

  readUser(req, res, next) {
    const listUser=User.find({})
      .then(listUser => res.status(200).json(listUser))
      .catch(error => res.status(400).json({ error }));
  },
  
login (req, res, next)  {

        User.findOne({ UserEmail: req.body.UserEmail })
          .then(user => {
            if (!user) {
              return res.status(401).json({ error: 'Utilisateur non trouvé !' });
            }
            bcrypt.compare(req.body.password, User.password)
              .then(valid => {
                if (!valid) {
                  return res.status(401).json({ error: 'Mot de passe incorrect !' });
                }
                res.status(200).json({
                  UserID: User._id,
                  token: jwt.sign(
                    { UserID: User._id },
                    'RANDOM_TOKEN_SECRET',
                    { expiresIn: '24h' }
                  )
                });
              })
              .catch(error => res.status(500).json({ error }));
          })
         
      }
    }