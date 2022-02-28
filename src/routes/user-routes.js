const express = require('express');
const router = express.Router();

let fs = require('fs')
const path = require("path");


//configuracion de validaciones del formulario de registro de usuario
const validationUserForm = require('../middlewares/user-validations')

//configuracion de multer
const fileUpload = require('../middlewares/user-multerStorage')


const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')



//controllers
const userController = require('../controllers/userCntrl');


//traer form de registro
router.get('/register', guestMiddleware, userController.getRegister);
//registrar usuario
router.post('/new-user', fileUpload.single('avatar-img'), validationUserForm, userController.newUser)
//traer form de login
router.get('/login', guestMiddleware, userController.getLogin);
//loguear usuario
router.post('/login', userController.loginProcess);
//traer profile de usuario
router.get('/profile', authMiddleware, userController.userProfile);
//traer detalles de usuario
router.get('/detail/:id', userController.userDetail);
//logout
router.get('/logout', userController.logout);
//traer form de edicion de usuario
router.get('/:id/edit-form', userController.editUserForm);
//editar informacion de usuario
router.put('/:id/edit', fileUpload.single('avatar-img'), validationUserForm, userController.editUser )



module.exports = router;