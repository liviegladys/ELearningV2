const mongoose = require('mongoose'); //faire appel à mongoose
const uniqueValidator = require('mongoose-unique-validator');



const UserSchema = mongoose.Schema({// schema de données
   
    UserName: { type: String, required: true },
    UserSurname:{type: String, required: true},
    UserEmail: { type: String, required: true,unique:true},
    password: { type: String, required: true }
});

UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', UserSchema);// exporter le schema de donnée dans mongoose



