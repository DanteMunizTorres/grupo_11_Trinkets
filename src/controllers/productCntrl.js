let fs = require('fs')
const path = require("path");

//listado de productos
let productsListJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'), {encoding: 'utf-8'});
let productList = JSON.parse(productsListJSON);

const controller = {
  product: (req, res) => {
    let id = req.params.id
    let productToShow = id -1 
    // let productDetail = productList.map(product => product.id == id) ESTA FUNCION NO FUNCIONO
    res.render('../views/product/product-detail.ejs', {productList: productList[productToShow]})
  },
  upload: (req, res) => {
    res.render('../views/product/product-upload.ejs')
  },
  cart: (req, res) => {
    res.render('../views/product/cart.ejs')
  },
  list: (req, res) => {
    res.render('../views/product/products-list.ejs', {productList})
  }
};

module.exports = controller;