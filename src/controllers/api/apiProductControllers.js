const path = require("path");
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
//modelos de base de datos------
let Product = require('../../database/models/Product');
let ImgProduct = require('../../database/models/ImgProduct');
let Purchase = require('../../database/models/Purchase')


const apiProductController = {
  list: (req, res) => { //mostrar listado de productos
    Product.findAll({
      include: [
        { association: 'images' },
        { association: 'owner' }
      ]
    })
      .then(productsDB => {
        let result = {
          meta: {
            status: 200,
            total: productsDB.length,
            url: '/api/products/list'
          },
          data: productsDB
        }

        res.json(result)
      })
      .catch(err => console.log('----------------HUBO UN ERROR: ' + err))
  },
  productDetail: (req, res) => { //traer detalle de producto

    let id = req.params.id
    Product.findByPk(id, {
      include: [
        { association: 'images' },
        { association: 'owner' }
      ],
    })
      .then(productToShow => {
        console.log(productToShow.owner.firstName);
        res.render('../views/product/product-detail.ejs', { productList: productToShow })
      })
      .catch(err => console.log('----------------HUBO UN ERROR: ' + err))

  },
  // create: (req, res) => { //mostrar vista de creacion de producto
  //   res.render('../views/product/product-create.ejs')
  // },
  // cart: (req, res) => { //mostrar carrito
  //   res.render('../views/product/cart.ejs')
  // },
  createNewProduct: (req, res) => {
    //validacion de los campos
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      let newProduct = {
        name: req.body.name,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price,
        // image: req.body.image, 
        discount: "",
        description: req.body.description,
        userSellerId: req.session.userLogged.id
      }

      let productImgs = req.files

      Product.create(newProduct)
        .then(result => {
          productImgs.forEach(element => { //con el foreach crea de una imagen oh yes!
            ImgProduct.create({
              name: element.filename,
              productId: result.id
            })
          })
        })
        .then(() => {
          res.redirect('/product/list')
        })
        .catch(err => console.log('----------------HUBO UN ERROR: ' + err))

      //si vienen errores en las validaciones
    } else {
      res.render('../views/product/product-create', { errors: errors.mapped(), old: req.body })
    }

  },
  // editForm: (req, res) => { //traer formulario para editar producto

  //   let id = req.params.id
  //   Product.findByPk(id)
  //     .then(productToShow => {
  //       ImgProduct.findAll({
  //         where: { productId: id }
  //       }).then(imagenesDeProducto => {
  //         let imagenes = imagenesDeProducto.map(imagen => imagen.dataValues)
  //         res.render('../views/product/product-edit.ejs', { product: productToShow, imgs: imagenes })
  //       })
  //     })
  // },
  edit: (req, res) => { //editar producto

    let id = req.params.id
    let productEdited = {
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
      price: req.body.price,
      description: req.body.description,
    }
    Product.update( //modificaria info del producto
      productEdited,
      { where: { id: req.params.id } }
    ).then(() => {
      let imagenes = req.files
      imagenes.forEach(img => {
        ImgProduct.create({
          name: img.filename,
          productId: id
        })
      })
    })
      .then(() => {
        let imagenesABorrar = req.body.deleteImg
        if (imagenesABorrar != undefined) {
          if (Array.isArray(imagenesABorrar)) {
            imagenesABorrar.forEach(imgId => {
              ImgProduct.destroy({
                where: {
                  id: imgId
                }
              })
            })
          } else {
            ImgProduct.destroy({
              where: {
                id: imagenesABorrar
              }
            })
          }
        }
      }).then(result => {
        res.redirect(`/product/detail/${id}`)
      })
  },
  delete: (req, res) => { //borrar producto
    let id = req.params.id;
    ImgProduct.destroy({
      where: {
        productId: id
      }
    })
      .then(() => {
        Product.destroy({
          where: {
            id: id
          }
        })
      })
      .then(() => {
        res.redirect('/product/list')
      })
  },
  search: (req, res) => { //buscar en product-list
    let searchOptions = {
      name: req.body.searchThis,
      category: req.body.searchCategory
    }
    if (searchOptions.category && searchOptions.name) {
      Product.findAll({
        where: {
          category: searchOptions.category,
          name: {
            [Op.like]: `%${searchOptions.name}%`
          }
        },
        include: [
          { association: 'images' }
        ]
      })
        .then(productsDB => {
          res.render('../views/product/products-list.ejs', { productList: productsDB, old: req.body })
        })
        .catch(err => console.log('----------------HUBO UN ERROR: ' + err))
    } else if (searchOptions.category) {
      Product.findAll({
        where: {
          category: searchOptions.category,
        },
        include: [
          { association: 'images' }
        ]
      })
        .then(productsDB => {
          res.render('../views/product/products-list.ejs', { productList: productsDB, old: req.body })
        })
        .catch(err => console.log('----------------HUBO UN ERROR: ' + err))
    } else if (searchOptions.name) {
      Product.findAll({
        where: {
          name: {
            [Op.like]: `%${searchOptions.name}%`
          }
        },
        include: [
          { association: 'images' }
        ]
      })
        .then(productsDB => {
          res.render('../views/product/products-list.ejs', { productList: productsDB, old: req.body })
        })
        .catch(err => console.log('----------------HUBO UN ERROR: ' + err))
    } else {
      Product.findAll({
        include: [
          { association: 'images' }
        ]
      })
        .then(productsDB => {
          res.render('../views/product/products-list.ejs', { productList: productsDB, old: req.body })
        })
        .catch(err => console.log('----------------HUBO UN ERROR: ' + err))
    }
  }//aca termina search

}; //aca termina controller

module.exports = apiProductController;