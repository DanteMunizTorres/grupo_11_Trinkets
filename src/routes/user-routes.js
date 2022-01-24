const express = require('express');
const router = express.Router();

let fs = require('fs')
const path = require("path");

const {body} = require('express-validator')

//configuracion de validaciones del formulario de registro de usuario
const validationUserForm = [
  body('name')
    .notEmpty().ltrim().rtrim().withMessage('Debes escribir un nombre').bail(),
  body('surname')
    .notEmpty().ltrim().rtrim().withMessage('Debes escribir un apellido').bail(),
  body('dni')
    .notEmpty().ltrim().rtrim().withMessage('Falta DNI').bail(),
  body('city')
    .notEmpty().ltrim().rtrim().withMessage('Falta ciudad').bail(),
  body('email')
    .notEmpty().ltrim().rtrim().withMessage('Falta dirección de correo electrónico').bail()
    .isEmail().withMessage('Debes escribir un e-mail válido').bail(),
  body('password')
    .notEmpty().ltrim().rtrim().withMessage('Debes llenar el campo').bail(),
  body('terms')
  
  
    .isBoolean().withMessage('Debes aceptar los términos y condiciones').bail(),
  body('avatar-img')
    // .notEmpty().withMessage('').bail()
]



//configuracion de multer
const multer = require('multer');
let multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    let folder = path.join(__dirname, '../../public/img/users');
    cb(null, folder);
  },
  filename: (req, file, cb)=>{
    let imgName = 'avatar_' + Date.now() + path.extname(file.originalname);
    cb(null, imgName)
  }
})
let fileUpload = multer({storage: multerDiskStorage})




const userController = require('../controllers/userCntrl');

router.get('/register', userController.getRegister);
router.get('/login', userController.getLogin);

router.post('/new-user', fileUpload.single('avatar-img'), validationUserForm, userController.newUser)



module.exports = router;