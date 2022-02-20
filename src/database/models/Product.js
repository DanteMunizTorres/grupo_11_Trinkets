const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize('trinkets', 'root', null, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

try {
  db.authenticate();
  console.log('Tenemos conexion en Product')
} catch (error) {
  console.log('Hubo un error en la conexion de Product: ' + error)
}






const Product = db.define('Product', {

    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    category: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER(1),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      unique: 'true',
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userSellerId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, 
  {
    tableName: 'products',
    timestamps: false
  });

let ImgProduct = require('./ImgProduct')
let User = require('./User')
let Size = require('./Size')
let Category = require('./Category')


  //relacion con usuario, propietario del producto a vender
  Product.belongsTo(User, { //en el video de playground le agrega una s Users
    as: "owner",
    foreignKey: "userSellerId",
  })
  //relacion con tamaños
  Product.belongsTo(Size, { //en el video de playground le agrega una s Users
    as: "sizeP",
    foreignKey: "size",
  })
  //relacion con categoria
  Product.belongsTo(Category, { //en el video de playground le agrega una s Users
    as: "categoryP",
    foreignKey: "category",
  })
  //relacion con imagenes de productos
  Product.hasMany(ImgProduct, { //en el video de playground le agrega una s Products
    as: "images",
    foreignKey: "productId",
  })
  //relacion de compra, carrito
  // Product.belongsToMany(User, {
  //   as: 'sold',
  //   through: 'purchases',
  //   foreignKey: 'productId',
  //   otherKey:'userId',
  //   timestamps: true
  // })




module.exports = Product
