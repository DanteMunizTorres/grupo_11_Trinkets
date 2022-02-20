const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize('trinkets', 'root', null, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

try {
  db.authenticate();
  console.log('Tenemos conexion en Size')
} catch (error) {
  console.log('Hubo un error en la conexion de Size: ' + error)
}

const Size = db.define('Size', {

    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING(7),
      allowNull: false
    },
  }, 
  {
    tableName: 'sizes',
    timestamps: false
  });


  // let Product = require('./Product')
  // Size.hasMany(Product, { //en el video de playground le agrega una s Products
  //   as: "productSize",
  //   foreignKey: "size",
  // })


module.exports = Size