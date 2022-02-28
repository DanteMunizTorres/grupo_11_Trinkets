const path = require("path");
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
//modelos de base de datos------
let User = require('../../database/models/User');
let Purchase = require('../../database/models/Purchase')

const apiUserController = {
    list: (req, res) => {
        User.findAll({
         })
         .then(users => {
            let result = {
              status: 200,
              count: users.length,
              users: 
                users.map(user => {
                  return {
                    id: user.id,
                    name: user.firstName + " " + user.lastName,
                    email: user.email,
                    detail: "/user/detail/"+user.id,
                    
                  }
                })

            }
            res.json(result)
         })
 
 
     },
     id: (req, res) => {
      User.findOne({
        where: {
          id: req.params.id
        }
      }).then((user) => {
        delete user.dataValues.password
        res.json(user)
      })

     }






}; // FIN funcion controller

module.exports = apiUserController;