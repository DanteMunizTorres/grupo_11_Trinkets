const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Product = sequelize.define('Product', {

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

Product.associate = function(modelos){
  //relacion con usuario, propietario del producto a vender
  Product.belongsTo(modelos.User, { //en el video de playground le agrega una s Users
    as: "owner",
    foreignKey: "userSellerId",
  })
  //relacion con tamaños
  Product.belongsTo(modelos.Size, { //en el video de playground le agrega una s Users
    as: "productSize",
    foreignKey: "size",
  })
  //relacion con categoria
  Product.belongsTo(modelos.Category, { //en el video de playground le agrega una s Users
    as: "productCategory",
    foreignKey: "category",
  })
  //relacion con imagenes de productos
  Product.hasMany(modelos.ImgProduct, { //en el video de playground le agrega una s Products
    as: "imgProduct",
    foreignKey: "productId",
  })
  //relacion de compra, carrito
  Product.belongsToMany(modelos.User, {
    as: 'productSold',
    through: 'purchases',
    foreignKey: 'productId',
    otherKey:'userId',
    timestamps: true
  })
}



module.exports = Product
