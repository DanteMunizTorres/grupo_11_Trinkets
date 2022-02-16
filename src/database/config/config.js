// ESTO FUE CREADO POR SECUELIZE-CLI

module.exports = {
  "development": {
    "username": "root",
    "password": null,
    "database": "trinkets",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "3306"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}


//ESTO FUE CREADO MANUALMENTE USANDO LA DOCUMENTACION DE SECUELIZE.

// const { Sequelize } = require('sequelize');



// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('trinkets', 'root', '', {
//   host: 'localhost',
//   dialect:'mysql'
// });

// async function checkDBconection(sequelize){
//   try {
//     await sequelize.authenticate();
//     console.log('Connection has been established successfully, todo anda bien amigo.');
//   } catch (error) {
//     console.error('Unable to connect to the database:', error);
//   }

// }

// module.exports = {sequelize, checkDBconection};