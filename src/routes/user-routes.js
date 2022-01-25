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



router.get('/register', guestMiddleware, userController.getRegister);
router.post('/new-user', fileUpload.single('avatar-img'), validationUserForm, userController.newUser)
router.get('/login', guestMiddleware, userController.getLogin);
router.post('/login', userController.loginProcess);
router.get('/profile', authMiddleware, userController.userProfile);
router.get('/logout', userController.logout);



module.exports = router;