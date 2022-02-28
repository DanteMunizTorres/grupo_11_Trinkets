const path = require("path");
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
//modelos de base de datos------
let Product = require('../../database/models/Product');
let ImgProduct = require('../../database/models/ImgProduct');
let Purchase = require('../../database/models/Purchase');
const { nextTick } = require("process");


const apiProductController = {
  list: (req, res) => { //mostrar listado de productos
    Product.findAll({
      include: [
        { association: 'images' },
        { association: 'owner' },
        { association: 'categoryP' }
      ]
    })
      .then(productsDB => {
        // console.log('ESTO TRAAE PRODUCTS-----------------------------------------------------');
        // console.log(productsDB[3].dataValues.categoryP.dataValues.name)
        let productColeccionable = []
        productsDB.map(product => {
          if (product.dataValues.categoryP.dataValues.name == 'coleccionable') {
            return productColeccionable.push(product)
          }
        })
        let productArtesania = []
        productsDB.map(product => {
          if (product.dataValues.categoryP.dataValues.name == 'artesania') {
            return productArtesania.push(product)
          }
        })
        let productArte = []
        productsDB.map(product => {
          if (product.dataValues.categoryP.dataValues.name == 'arte') {
            return productArte.push(product)
          }
        })
        // console.log(productColeccionable.length);
        // console.log(productArtesania.length);
        // console.log(productArte.length);
        let result = {
          status: 200,
          count: productsDB.length,
          countByCategory: {
            coleccionable: productColeccionable.length,
            artesania: productArtesania.length,
            arte: productArte.length
          },
          products:
            productsDB.map(product => {
              delete product.owner.dataValues.password
              return {
                id: product.dataValues.id,
                name: product.dataValues.name,
                description: product.dataValues.description,
                category: product.dataValues.categoryP.dataValues.name,
                owner: product.dataValues.owner,
                images: product.dataValues.images,
                detail: '/api/products/' + product.id
              }
            })
        }
        res.json(result)
      })
      .catch(err => console.log('----------------HUBO UN ERROR: ' + err))
  },
  productDetail: (req, res) => { //traer detalle de producto
    let id = req.params.id
    if (id < 1) {
      Product.findOne({
        order: [['id', 'DESC']]
      })
        .then(product => {
          console.log(product.dataValues.id)
          id = product.dataValues.id
          Product.findByPk(id, {
            include: [
              { association: 'images' },
              { association: 'owner' },
              { association: 'categoryP' },
              { association: 'sizeP' }
            ],
          })
          .then(product => {
            delete product.owner.dataValues.password
            let result = {
              id: product.dataValues.id,
              name: product.dataValues.name,
              description: product.dataValues.description,
              category: product.dataValues.categoryP.dataValues.name,
              size: product.dataValues.sizeP.dataValues.name,
              owner: product.dataValues.owner,
              imageURL: path.join(__dirname, '/../../../public/img/products/', product.dataValues.images[0].name),
            }
            res.json(result)

        })
    })
  }    
    
    console.log(id)
    Product.findByPk(id, {
      include: [
        { association: 'images' },
        { association: 'owner' },
        { association: 'categoryP' },
        { association: 'sizeP' }
      ],
    })
      .then(product => {
        delete product.owner.dataValues.password
        let result = {
          id: product.dataValues.id,
          name: product.dataValues.name,
          description: product.dataValues.description,
          category: product.dataValues.categoryP.dataValues.name,
          size: product.dataValues.sizeP.dataValues.name,
          owner: product.dataValues.owner,
          imageURL: path.join(__dirname, '/../../../public/img/products/', product.dataValues.images[0].name),
        }
        res.json(result)
      })
      .catch(err => console.log('----------------HUBO UN ERROR: ' + err))

  },
  //   Nuestra API de productos será muy similar. Sus dos endpoints entregarán la lista
  // completa de productos y el detalle de un producto en particular.

  // ● api/products/:id
  // ○ Deberá devolver un objeto literal con la siguiente estructura:
  // ■ una propiedad por cada campo en base.
  // ■ un array por cada relación de uno a muchos (categories, colors,
  // sizes, etc).
  // ■ Una URL para la imagen del producto (para mostrar la imagen).
  // Entregable: URL funcionales devolviendo datos de productos en formato JSON.


}; //aca termina controller

module.exports = apiProductController;