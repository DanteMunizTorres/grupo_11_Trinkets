const { Sequelize, DataTypes } = require('sequelize');
const db = new Sequelize('trinkets', 'root', null, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

try {
  db.authenticate();
  console.log('Tenemos conexion en ImgProduct')
} catch (error) {
  console.log('Hubo un error en la conexion de ImgProduct: ' + error)
}






const ImgProduct = db.define('ImgProduct', {

    id: { 
      type: DataTypes.INTEGER,
      autoIncrement: true, 
      primaryKey: true 
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING(30),
      allowNull: false
    }
  }, 
  {
    tableName: 'imgproducts',
    timestamps: false
  });

ImgProduct.associate = function(modelos){
  ImgProduct.belongsTo(modelos.Product, { //en el video de playground le agrega una s Products
    as: "images",
    foreignKey: "productId",
  })
}



module.exports = ImgProduct
