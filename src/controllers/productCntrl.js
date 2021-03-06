let fs = require('fs')
const path = require("path");
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

//listado de productos en formato JSON
let productListPath = path.join(__dirname, '../data/products.json')
let productsListJSON = fs.readFileSync(productListPath, { encoding: 'utf-8' });
let productList = JSON.parse(productsListJSON);


// let db = require('../database/models') //ESTO NO ME FUNCIONO PARA CONECTAR LA DB
// const Product = db.Product;


//modelos de base de datos
let Product = require('../database/models/Product')
let ImgProduct = require('../database/models/ImgProduct');



const { nextTick } = require('process'); //esto no entiendo por que esta aca
const sequelize = require('sequelize'); //esto no entiendo por que esta aca

// Product.findByPk(1).then(result => console.log(result))




const controller = {
  product: (req, res) => { //traer detalle de producto

    let id = req.params.id
    Product.findByPk(id, {
      include: [
        { association: 'images' },
        { association: 'owner' }
      ],
    })
      .then(productToShow => {
        console.log(productToShow.owner.id);
        console.log(productToShow);
        // console.log(productToShow.map(product => product.owner.map(img => img.dataValues.name)))
        res.render('../views/product/product-detail2.ejs', { productList: productToShow })
      })
      .catch(err => console.log('----------------HUBO UN ERROR (1): ' + err))

  },
  create: (req, res) => { //mostrar vista de creacion de producto
    res.render('../views/product/product-create.ejs')
  },
  cart: (req, res) => { //mostrar carrito
    res.render('../views/product/cart.ejs')
  },
  list: (req, res) => { //mostrar listado de productos
    Product.findAll({
      include: [
        { association: 'images' }
      ]
    })
      .then(productsDB => {
        // console.log('ESTA PASANDO POR LIST-----------------------------------------------------------------');
        // console.log('---------------------------------productsDB');
        // console.log(productsDB.map(product => product.images.map(img => img.dataValues.name)))
        res.render('../views/product/products-list.ejs', { productList: productsDB })
        // res.render('../views/main/homeAlt.ejs', { productList: productsDB })
      })
     
      .catch(err => console.log('----------------HUBO UN ERROR (2): ' + err))
  },
  createNewProduct: (req, res) => {



    //validacion de los campos
    let errors = validationResult(req)
    if (errors.isEmpty()) {
      console.log('ESTO TRAE FILES-------------------------------------------');
      console.log(req.body.image);
      console.log('ESTO TRAE REQ.BODY----------------------------------------------');
      console.log(req.body);
      let newProduct = {
        name: req.body.name,
        category: req.body.category,
        size: req.body.size,
        price: req.body.price,
        // image: req.body.image, 
        discount: "",
        description: req.body.description,
        userSellerId: req.session.userLogged.id
        // includes:
      }
      // let productImgs = { //agrego el JSON.strinify y agrego 's' a 'file' = 'files'
      //   name: req.files.filename, //se cambio req.body.image, ya que lego de subirse la imagen por multer esta cambia de nombre
      //   productId: ''
      // }
      let productImgs = req.files
      console.log(productImgs);


      Product.create(newProduct)
        .then(result => {
          // console.log(newProduct);
          // productImgs.productId = result.id
          // ImgProduct.create(productImgs)
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
        .catch(err => console.log('----------------HUBO UN ERROR EN (3): ' + err))

      //si vienen errores en las validaciones
    } else {
      res.render('../views/product/product-create', { errors: errors.mapped(), old: req.body })
    }

  },
  editForm: (req, res) => { //traer formulario para editar producto

    let id = req.params.id
    Product.findByPk(id)
      .then(productToShow => {

        ImgProduct.findAll({
          where: { productId: id }
        }).then(imagenesDeProducto => {
          let imagenes = imagenesDeProducto.map(imagen => imagen.dataValues)
          // console.log(imagenesDeProducto[0].dataValues.name)  
          //   console.log('esto trae imgs---------------------------------------------------------------------------');
          // console.log(imagenes);


          res.render('../views/product/product-edit.ejs', { product: productToShow, imgs: imagenes })
        })

      })

  },
  edit: (req, res) => { //editar producto
    // let imagenesABorrar = req.body.deleteImg
    //     console.log('esto trae deleteimgenes--------------------------------------------------------------------------');
    //     console.log(imagenesABorrar);

    let id = req.params.id
    let productEdited = {
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
      price: req.body.price,
      // image: req.body.image, 
      // discount: "",
      description: req.body.description,
      // userSellerId: req.session.userLogged.id
    }
    // let imgProductEdited = {
    //   name: JSON.stringify(image),// transformo a json para que me permita subir todos los nombres
    //   // productId: ''
    // }
    // console.log('esto trae imgProductEdited---------------------------------------------------------------------------');
    // console.log(imgProductEdited);

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
    console.log(searchOptions);

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
        .catch(err => console.log('----------------HUBO UN ERROR (4): ' + err))
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
        .catch(err => console.log('----------------HUBO UN ERROR (5): ' + err))
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
        .catch(err => console.log('----------------HUBO UN ERROR (6): ' + err))
    } else {
      Product.findAll({
        include: [
          { association: 'images' }
        ]
      })
        .then(productsDB => {
          res.render('../views/product/products-list.ejs', { productList: productsDB, old: req.body })
        })
        .catch(err => console.log('----------------HUBO UN ERROR (7): ' + err))
    }
  }//aca termina search

}; //aca termina controller

module.exports = controller;