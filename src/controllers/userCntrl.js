
let fs = require('fs')
const path = require("path");
let bcrypt = require('bcryptjs')
const { validationResult } = require('express-validator')

const multer = require('multer');
// const {
//   check,
//   validationResult,
//   body
// } = require('express-validator');



//----------------------------------------------------------------------------------------------------------------

// let req = require('express/lib/request'); // NO SE POR QUE ESTA ESTO ACA

//----------------------------------------------------------------------------------------------------------------









//listado de usuarios
// let usersListPath = path.join(__dirname,'../data/users.json')
// let usersListJSON = fs.readFileSync(usersListPath, {encoding: 'utf-8'});
// let usersList = JSON.parse(usersListJSON);

// const User = require('../models/User.js');


let User = require('../database/models/User')

//esto va funcionando
// User.findAll().then(result => console.log(result)) 

// User.findByPk(3).then(result => console.log(result))




//ESTO LO HICE PARA COMPROBAR LA CONEXION CON LA BASE DE DATOS Y SI FUNCIONA
// let test
// User.findOne({
//   where: {
//     email: 'srickman1@va.gov'
//   }
// }).then(result => {console.log(result.email); return result = test})
// console.log('RESULTADO DE TEST                                                    TEST RESULDATO')
// console.log(test)
// EL PROBLEMA ERA EL MANEJO CORRECTO DE LAS PROMESAS Y SUS REASULTADOS

const controller = {
  getRegister: (req, res) => {
    let errors = validationResult(req);
    res.render('./user/register', { errors })
  },
  getLogin: (req, res) => {
    let errors = validationResult(req);
    res.render('./user/login', { errors })
  },
  newUser: (req, res) => {
    //validacion de los campos
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      //si esta todo bien genera el usuario
      //TENIENDO EL MODEL DE USER.JSON


      //checkeo que si el usuario ya existe en la base de datos mediante el email
      let userInDB // = User.findByField('email', req.body.email);
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then((result) => userInDB = result);

      if (userInDB) {
        return res.render('../views/user/register', {
          errors: {
            email: {
              msg: 'Este mail de usuario ya existe'
            }
          },
          old: req.body
        })
      }
      //checkeo de la imagen de usuario, si esta vacia se coloca imagen default
      let avatarImg
      if (req.file){
        avatarImg = req.file.filename;
      } else {
        avatarImg = 'default.svg'
      }   

      // console.log(req.body)
      let userToCreate = {
        // ...req.body, //POR LAS DUDAS NO USO ESTE Y ESPECIFICO CADA CAMPO
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        DNI: req.body.DNI,
        city: req.body.city,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        imgUser: avatarImg,
      }

      //ESTO ES DE LA FORMA ANTERIOR CON LA BASE DE DATOS EN JSON
      // let userCreated = User.create(userToCreate);



      User.create(userToCreate);


      //ANTES DE TENER EL MODELO JSON
      // let newId = usersList.length + 1;

      // //encriptacion de la contraseña
      // let password = req.body.password;
      // let encryptedPassword = bcrypt.hashSync(password, 10);

      // //checkeo de la imagen de usuario, si esta vacia se coloca imagen default
      // let avatarImg
      // if (req.file){
      //   avatarImg = req.file.filename;
      // } else {
      //   avatarImg = 'default.svg'
      // }     

      // //asignacion de valores que vienen del formulario
      // let newUser = {
      //   id: newId,
      //   name: req.body.name,
      //   surname: req.body.surname,
      //   dni: req.body.dni,
      //   city: req.body.city,
      //   email: req.body.email, 
      //   password: encryptedPassword,
      //   terms: req.body.terms,
      //   avatarImg: avatarImg
      // }

      // //escritura del json de usuarios
      // usersList.push(newUser);
      // let newUsersList = JSON.stringify(usersList, null, ' ');
      // fs.writeFileSync(usersListPath, newUsersList)

      res.redirect('/user/login')

      //si vienen errores en las validaciones
    } else {
      res.render('../views/user/register', { errors: errors.mapped(), old: req.body })
    }

  },
  loginProcess: (req, res) => {
    // console.log(req.body.email);


    // let userToLogin = User.findByField('email', req.body.email); //FORMA CON JSON


    let userToLogin;
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((result) => userToLogin = result)
      .then(userToLogin => {

        if (userToLogin) {
          let validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
          if (validPassword) {
            delete userToLogin.password;
            req.session.userLogged = userToLogin;
    
            if (req.body.remember) {
              res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 10 })
            }
    
            return res.redirect('/user/profile')
    
          } else {
            return res.render('../views/user/login', {
              errors: {
                password: {
                  msg: 'Contraseña inválida'
                }
              },
              old: req.body
            })
          }
        } else {
          return res.render('../views/user/login', {
            errors: {
              email: {
                msg: 'Dirección de correo inválida'
              }
            },
            old: req.body
          })
        }
      })//aca termina el ultimo .then





    //aca termina loguin procces
  },
  userProfile: (req, res) => {

    res.render('../views/user/profile', {
      user: req.session.userLogged
    })
  },
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    res.redirect('/')
  }
};

module.exports = controller;



