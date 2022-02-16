const {check} = require('express-validator')

//configuracion de validaciones del formulario de registro de usuario
const validationUserForm = [
    check('firstName')
      .notEmpty().ltrim().rtrim().withMessage('Debes escribir un nombre').bail(),
    check('lastName')
      .notEmpty().ltrim().rtrim().withMessage('Debes escribir un apellido').bail(),
    check('DNI')
      .notEmpty().ltrim().rtrim().withMessage('Falta DNI').bail(),
    check('city')
      .notEmpty().ltrim().rtrim().withMessage('Falta ciudad').bail(),
    check('email')
      .notEmpty().ltrim().rtrim().withMessage('Falta dirección de correo electrónico').bail()
      .isEmail().withMessage('Debes escribir un e-mail válido').bail(),
    check('password')
      .notEmpty().ltrim().rtrim().withMessage('Debes llenar el campo').bail(),
    check('terms')
    
    
      .isBoolean().withMessage('Debes aceptar los términos y condiciones').bail(),
    // check('avatar-img')
      // .notEmpty().withMessage('').bail()
  ]

module.exports = validationUserForm;
