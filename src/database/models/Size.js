const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('sqlite::memory:');

const Size = sequelize.define('Size', {

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

Size.associate = function(modelos){
  Size.hasMany(modelos.Product, { //en el video de playground le agrega una s Products
    as: "productSize",
    foreignKey: "size",
  })
}

module.exports = Size