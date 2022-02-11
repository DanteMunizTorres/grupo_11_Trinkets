const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const ImgProduct = sequelize.define('ImgProduct', {

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
    tableName: 'imgproducts',
    timestamps: false
  });

ImgProduct.associate = function(modelos){
  ImgProduct.belongsTo(modelos.Product, { //en el video de playground le agrega una s Products
    as: "imgProduct",
    foreignKey: "productId",
  })
}



module.exports = ImgProduct
