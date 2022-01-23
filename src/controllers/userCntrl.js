
let fs = require('fs')
const path = require("path");



//listado de usuarios
let usersListPath = path.join(__dirname,'../data/users.json')
let usersListJSON = fs.readFileSync(usersListPath, {encoding: 'utf-8'});
let usersList = JSON.parse(usersListJSON);



const controller = {
  getRegister: (req, res) => {
    res.render('../views/user/register')
  },
  getLogin: (req, res) => {
    res.render('../views/user/login')
  },
  newUser: (req, res) => {
    let newId = usersList.length + 1;
    let password = req.body.password;
    let encryptedPassword = bcrypt.hashSync(password, 10);
    let avatarImg = req.body.avatar-img;
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

    usersList.push(newUser);

    let newUsersList = JSON.stringify(usersList);

    fs.writeFileSync(usersListPath, newUsersList)

    res.redirect('/')
  }
};

module.exports = controller;