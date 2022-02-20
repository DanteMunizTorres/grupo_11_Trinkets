let fs = require('fs')
const path = require("path");
const { validationResult } = require('express-validator')


//listado de productos
let productListPath = path.join(__dirname,'../data/products.json')
let productsListJSON = fs.readFileSync(productListPath, {encoding: 'utf-8'});
let productList = JSON.parse(productsListJSON);


// let db = require('../database/models') //ESTO NO ME FUNCIONO PARA CONECTAR LA DB
// const Product = db.Product;

let Product = require('../database/models/Product')
let ImgProduct = require('../database/models/ImgProduct')
// let test
// Product.findByPk(1).then(result => console.log(result))




const controller = {
  product: (req, res) => { //traer detalle de producto

    let id = req.params.id
    Product.findByPk(id)
      .then(productToShow => {
        res.render('../views/product/product-detail.ejs', {productList: productToShow})
      })





    // let id = req.params.id
    // let productToShow = id -1
    // // let productDetail = productList.map(product => product.id == id) ESTA FUNCION NO FUNCIONO
    // res.render('../views/product/product-detail.ejs', {productList: productList[productToShow]})
  },
  create: (req, res) => { //mostrar vista de creacion de producto
    res.render('../views/product/product-create.ejs')
  },
  cart: (req, res) => { //mostrar carrito
    res.render('../views/product/cart.ejs')
  },
  list: (req, res) => { //mostrar listado de productos
    Product.findAll()
      .then(productsDB => {
        res.render('../views/product/products-list.ejs', {productList: productsDB})

      })
  },
  createNewProduct: (req, res) => { 



    //validacion de los campos
    let errors = validationResult(req)
    if (errors.isEmpty()) {

      let newProduct = {
        name: req.body.name,
        category: req.body.category,
        size: req.body.size,
        price:req.body.price,
        // image: req.body.image, 
        discount: "",
        description: req.body.description,
        userSellerId: req.session.userLogged.id
        // includes:
      }
      let productImgs = {
        name: req.body.image,
        productId: ''
      }



      Product.create(newProduct)
        .then(result => {
          productImgs.productId = result.id
          ImgProduct.create(productImgs)

        })




      res.redirect('/product/list')

      //si vienen errores en las validaciones
    } else {
      res.render('../views/product/create', { errors: errors.mapped(), old: req.body })
    }









//ESTO CON JSON
    
  //   let newId = productList.length + 1;
  //   let newProduct = {
  //     id: newId,
  //     name: req.body.name,
  //     category: req.body.category,
  //     size: req.body.size,
  //     price:req.body.price,
  //     image: "", 
  //     discount: "",
  //     description: req.body.description
  //   }

  //   productList.push(newProduct);

  //   let newProductList = JSON.stringify(productList, null, ' ');

  //   fs.writeFileSync(productListPath, newProductList)

  // console.log(req.body)

  //   res.redirect('/product/list')



  },
  editForm: (req,res) => { //traer formulario para editar producto

    let id = req.params.id
    Product.findByPk(id)
      .then(productToShow => {
        
        ImgProduct.findAll({
          where: {productId: id}
        }).then( imagenesDeProducto=> {
          let imagenes = imagenesDeProducto.map(imagen => imagen.dataValues.name)
          // console.log(imagenesDeProducto[0].dataValues.name)  

          res.render('../views/product/product-edit.ejs', {product: productToShow, imgs: imagenes})
        })

      })


      


    // let id = req.params.id
    // let productToShow = id -1 
    // res.render('../views/product/product-edit.ejs', {product: productList[productToShow]})





  },
  edit: (req,res) => { //editar producto
    
    
    let id = req.params.id
    let productEdited = {
        name: req.body.name,
        category: req.body.category,
        size: req.body.size,
        price:req.body.price,
        // image: req.body.image, 
        // discount: "",
        description: req.body.description,
        // userSellerId: req.session.userLogged.id
      }
      let imgProductEdited = {
        name: JSON.stringify(req.body.image, null, ' '),// transformo a json para que me permita subir todos los nombres
        // productId: ''
      }


    
      Product.update( //modificaria info del producto
        productEdited,
       {where: {id: req.params.id}}
      ).then(result => {
        ImgProduct.update( //modificaria imagenes del producto
          imgProductEdited,
        {
          where: {productId: id}
        })
      }).then(result => {
        res.redirect(`/product/detail/${id}`)
      })

      
      //CON LA BASE DE DATOS EN FORMAYO JSON-------------------------------------------
    // let id = req.params.id;
    // productList = productList.map(function(product) {
    //   if(product.id == id) {
    //     product.id = product.id;
    //     product.name = req.body.name;
    //     product.category = req.body.category;
    //     product.size = req.body.size;
    //     product.price = req.body.price;
    //     product.image = ""; 
    //     product.discount = "";
    //     product.description = req.body.description;

    //     return product
    //   } else {
    //     return product
    //   }
    // })
    

    // let newProductList = JSON.stringify(productList);

    // fs.writeFileSync(productListPath, newProductList)

    // res.redirect(`/product/detail/${id}`)


  },
  delete: (req,res) => { //borrar producto

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






    // //CON BASE DE DATOS EN FORMATO JSON
    // let id = req.params.id;
    // productList = productList.filter(function(product){
    //      return product.id != id;
    //  })

    // let newProductList = JSON.stringify(productList);

    // fs.writeFileSync(productListPath, newProductList)

    //  res.redirect('/product/list')
  }
};

module.exports = controller;