
let fs = require('fs')
const path = require("path");
let bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')


const User = require('../models/User')


//listado de usuarios
let usersListPath = path.join(__dirname,'../data/users.json')
let usersListJSON = fs.readFileSync(usersListPath, {encoding: 'utf-8'});
let usersList = JSON.parse(usersListJSON);



const controller = {
  getRegister: (req, res) => {
    let errors = validationResult(req);
    res.render('../views/user/register', {errors})
  },
  getLogin: (req, res) => {
    res.render('../views/user/login')
  },
  newUser: (req, res) => {
    //validacion de los campos
    let errors = validationResult(req)
    if (errors.isEmpty()) {      
      //si esta todo bien genera el usuario
//TENIENDO EL MODEL DE USER.JSON



//ANTES DE TENER EL MODELO
      let newId = usersList.length + 1;
      //encriptacion de la contraseña
      let password = req.body.password;
      let encryptedPassword = bcrypt.hashSync(password, 10);
      //checkeo de la imagen de usuario, si esta vacia se coloca imagen default
      let avatarImg
      if (req.file){
        avatarImg = req.file.filename;
      } else {
        avatarImg = 'default.svg'
      }     
      //asignacion de valores que vienen del formulario
      let newUser = {
        id: newId,
        name: req.body.name,
        surname: req.body.surname,
        dni: req.body.dni,
        city: req.body.city,
        email: req.body.email, 
        password: encryptedPassword,
        terms: req.body.terms,
        avatarImg: avatarImg
      }
      //escritura del json de usuarios
      usersList.push(newUser);
      let newUsersList = JSON.stringify(usersList, null, ' ');
      fs.writeFileSync(usersListPath, newUsersList)
  
      res.redirect('/')

    //si vienen errores en las validaciones
    } else {
      res.render('../views/user/register', {errors: errors.mapped(), old: req.body})
    }

  }
};

module.exports = controller;