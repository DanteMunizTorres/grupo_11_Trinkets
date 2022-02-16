const { Sequelize, DataTypes, Model } = require('sequelize');
const db = new Sequelize('trinkets', 'root', null, {
  host: 'localhost',
  port: '3306',
  dialect: 'mysql'
});

try {
  db.authenticate();
  console.log('Tenemos conexion en User')
} catch (error) {
  console.log('Hubo un error en la conexion de User: ' + error)
}


// class User extends Model { }

// User.init({
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true
//   },
//   firstName: {
//     type: DataTypes.STRING(30),
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING(30),
//     allowNull: false
//   },
//   DNI: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   email: {
//     type: DataTypes.STRING(30),
//     unique: 'true',
//     allowNull: false
//   },
//   password: {
//     type: DataTypes.STRING(100),
//     allowNull: false
//   },
//   imgUser: {
//     type: DataTypes.STRING(30),
//     defaultValue: "default.svg",
//     allowNull: false
//   }
// }, 
// {
//   // Other model options go here
//   db, // We need to pass the connection instance
//   sequelize: db,
//   modelName: 'User', // We need to choose the model name
//   tableName: 'users',
//   timestamps: false
// })








const User = db.define('User', {

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
    city: {
      type: DataTypes.STRING(30),
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
    as: "productOffered",
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
