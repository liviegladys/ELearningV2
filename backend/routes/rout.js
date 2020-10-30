const express = require('express');// passer par express
const router = express.Router();// 

const auth = require('../middleware/auth'); // passer par le middleware pour s' authentifier

const routCtrl = require('../controllers/rout'); //passer par le controller
const multer = require('../middleware/multer_config');//
const origamiCtrl = require('../controllers/origami_controller');
const userCtrl = require('../controllers/user');
const categorieCtrl = require('../controllers/categorie_controller');


router.get('/',  routCtrl.getAllOrigami);// route pour recuperer tous les emenents de la base  données 
router.post('/', multer, routCtrl.createOrigami);// route pour enregistrer les données 
router.get('/:id',  routCtrl.getOneOrigami);// route pour recuperer un elment specifique dans la base données 
router.put('/:id' ,multer, routCtrl.modifyOrigami);// route pour modifier les données 
router.delete('/:id', routCtrl.deleteOrigami);// route pour supprimer les données 



router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/readUser', userCtrl.readUser);
router.get('/login', userCtrl.login);


router.post('/describe', categorieCtrl.describe);



module.exports = router;