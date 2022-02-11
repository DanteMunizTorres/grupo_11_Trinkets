const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const User = sequelize.define('User', {

    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true 
    },
    firstName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    DNI: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(30),
      unique: 'true',
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    imgUser: {
      type: DataTypes.STRING(30),
      defaultValue: "default.svg",
      allowNull: false
    },
  }, 
  {
    tableName: 'users',
    timestamps: false
  });

User.associate = function(modelos){
  //relacion con usuario, propietario del producto a vender
  User.hasMany(modelos.Producto, { //en el video de playground le agrega una s Products
    as: "owner",
    foreignKey: "userSellerId",
  })
  //relacion de compra, carrito
  User.belongsToMany(modelos.Product, {
    as: 'productBought',
    through: 'purchases',
    foreignKey: 'userId',
    otherKey:'productId',
    timestamps: true
  })
}



module.exports = User
