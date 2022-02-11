const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Category = sequelize.define('Category', {

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

Category.associate = function(modelos){
  Category.hasMany(modelos.Product, { //en el video de playground le agrega una s Products
    as: "productCategory",
    foreignKey: "category",
  })
}

module.exports = Category