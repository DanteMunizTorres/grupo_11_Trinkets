
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





let User = require('../database/models/User')

//esto va funcionando
// User.findAll().then(result => console.log(result)) 
// User.findByPk(3).then(result => console.log(result))


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
      //checkeo que si el usuario ya existe en la base de datos mediante el email
      User.findOne({
        where: {
          email: req.body.email
        }
      }).then((userInDB) => {
        
        if (userInDB) {
          return res.render('../views/user/register', {
            errors: {
              email: {
                msg: 'Este mail de usuario ya existe'
              }
            },
            old: req.body
          })
        } else {

          //checkeo de la imagen de usuario, si esta vacia se coloca imagen default
          let avatarImg
          if (req.file) {
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
          User.create(userToCreate);
          res.redirect('/user/login')
        }//aca termina else
      });//aca termina .then


    } else {
      res.render('../views/user/register', { errors: errors.mapped(), old: req.body })
    }

  },
  loginProcess: (req, res) => {
    // console.log(req.body.email);

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then((userToLogin) => {
      if (userToLogin) {
        let validPassword = bcrypt.compareSync(req.body.password, userToLogin.password)
        if (validPassword) {
          delete userToLogin.password;
          req.session.userLogged = userToLogin;
          if (req.body.remember) {
            res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 240 })
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

  },
  userProfile: (req, res) => {
    // console.log('ESTO VIENE EN USERLOGGED-----------------------------------------------')
    // console.log(req.session.userLogged);
    res.render('../views/user/profile', {
      user: req.session.userLogged
    })
  },
  userDetail: (req, res) => {
    // console.log('ESTO VIENE EN USERLOGGED-----------------------------------------------')
    // console.log(req.session.userLogged);
    User.findOne({
      where: {
        id: req.params.id
      }
    }).then((userDetail) => {
      res.render('../views/user/detail', {
        user: userDetail
      })
    })
  
  },
  logout: (req, res) => {
    res.clearCookie('userEmail');
    req.session.destroy();
    res.redirect('/')
  },
  editUserForm: (req, res) => {
    let errors = validationResult(req);
    res.render('../views/user/edit', {
      user: req.session.userLogged, errors
    })
  },
  editUser: (req, res) => {
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      //si esta todo bien genera el usuario
      //checkeo que si el usuario ya existe en la base de datos mediante el email
    let id = req.params.id
        
          //checkeo de la imagen de usuario, si esta vacia se coloca imagen default
          
          // console.log(req.body)
          let userNewInfo = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            DNI: req.body.DNI,
            city: req.body.city,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 10),
            
          } 
          if (req.file) {
            userNewInfo.imgUser = req.file.filename;
          } 
          User.update(userNewInfo, {
            where: {
              id: id
            }
          })
          .then(()=> {
            //cambiar info de cookies y session
            // console.log(result);

            // res.clearCookie('userEmail');

            User.findOne({
              where: {
                id: id
              }
            })
            .then((userToLogin) => {
              console.log(id);
              console.log(userToLogin);
                  req.session.userLogged = userToLogin;
                  res.cookie('userEmail', userToLogin.email, { maxAge: (1000 * 60) * 240 })
                  
                  return res.redirect('/user/profile')
        
                })
          })
          .catch(err => console.log('----------------HUBO UN ERROR: ' + err))


    } else {
      res.render('../views/user/edit.ejs', { errors: errors.mapped(), old: req.body, user: req.session.userLogged })
    }
  }
};

module.exports = controller;



