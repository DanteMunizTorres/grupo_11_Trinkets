const fs = require('fs');
const path = require("path");

const User = {
  fileName: path.join(__dirname,'../data/users.json'),
  getData: ()=> {
    return JSON.parse(fs.readFileSync(User.fileName, 'utf-8'));
  },
  findAll: () => {
    return User.getData();
  },

  generateId: ()=> {
    let allUsers = User.findAll();
    let lastUser = allUsers.pop();
    if (lastUser) {
      return lastUser.id + 1;
    }
    return 1;
  },

  findByPk: (id)=> {
    let allUsers = User.findAll();
    let userFound = allUsers.find(oneUser => oneUser.id === id);
    return userFound;
  },

  findByField: (field, text) => {
    let allUsers = User.findAll();
    let userFound = allUsers.find(oneUser => oneUser[field] === text);
    return userFound;
  },

  create: (userData)=> {
    let allUsers = User.findAll();
    let newUser = {
      id: User.generateId(),
      ...userData
    }
    allUsers.push(newUser);
    fs.writeFileSync(User.fileName, JSON.stringify(allUsers, null, ' '));
    return newUser;
  },
  delete: (id)=> {
    let allUsers = User.findAll();
    let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
    fs.writeFileSync(User.fileName, JSON.stringify(finalUsers, null, ' '));
    // return true;
  }
  // edit: ()=> {

  // },
}

module.exports = User;