const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize('trinkets', 'root', null, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

try {
  db.authenticate();
  console.log('Tenemos conexion en Category')
} catch (error) {
  console.log('Hubo un error en la conexion de Category: ' + error)
}

const Category = db.define('Category', {

    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING(13),
      allowNull: false
    }
  }, 
  {
    tableName: 'categories',
    timestamps: false
  });


  // let Product = require('./Product')
  // Category.hasMany(Product, { //en el video de playground le agrega una s Products
  //   as: "products",
  //   foreignKey: "category",
  // })


module.exports = Category