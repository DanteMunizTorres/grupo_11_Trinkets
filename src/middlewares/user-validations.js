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

module.exports = validationUserForm;
