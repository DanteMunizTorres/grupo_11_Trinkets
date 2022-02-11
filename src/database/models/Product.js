const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Product = sequelize.define('User', {

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
  Product.belongsTo(modelos.User, {
    as: "owner",
    foreignKey: "userSellerId",
  })
}



module.exports = User
