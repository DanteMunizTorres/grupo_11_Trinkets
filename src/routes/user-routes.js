const express = require('express');
const router = express.Router();

let fs = require('fs')
const path = require("path");


//configuracion de validaciones del formulario de registro de usuario
const validationUserForm = require('../middlewares/user-validations')

//configuracion de multer
const fileUpload = require('../middlewares/user-multerStorage')

//controllers
const userController = require('../controllers/userCntrl');



router.get('/register', userController.getRegister);
router.post('/new-user', fileUpload.single('avatar-img'), validationUserForm, userController.newUser)
router.get('/login', userController.getLogin);
router.post('/login', userController.loginProcess);
router.get('/profile', userController.userProfile);



module.exports = router;