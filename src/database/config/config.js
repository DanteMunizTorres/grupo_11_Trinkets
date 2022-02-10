
const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('trinkets', 'root', '', {
  host: 'localhost',
  dialect:'mysql'
});

async function checkDBconection(sequelize){
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully, todo anda bien amigo.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

}

module.exports = {sequelize, checkDBconection};