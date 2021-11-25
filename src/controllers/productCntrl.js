let fs = require('fs')
const path = require("path");

//listado de productos
let productListPath = path.join(__dirname,'../data/products.json')
let productsListJSON = fs.readFileSync(productListPath, {encoding: 'utf-8'});
let productList = JSON.parse(productsListJSON);

const controller = {
  product: (req, res) => {
    let id = req.params.id
    let productToShow = id -1 
    // let productDetail = productList.map(product => product.id == id) ESTA FUNCION NO FUNCIONO
    res.render('../views/product/product-detail.ejs', {productList: productList[productToShow]})
  },
  create: (req, res) => {
    res.render('../views/product/product-create.ejs')
  },
  cart: (req, res) => {
    res.render('../views/product/cart.ejs')
  },
  list: (req, res) => {
    res.render('../views/product/products-list.ejs', {productList})
  },
  createNewProduct: (req, res) => {
    let newId = productList.length + 1;
    let newProduct = {
      id: newId,
      name: req.body.name,
      category: req.body.category,
      size: req.body.size,
      price:req.body.price,
      image: "", 
      discount: "",
      description: req.body.description
    }

    productList.push(newProduct);

    let newProductList = JSON.stringify(productList);

    fs.writeFileSync(productListPath, newProductList)

    res.redirect('/product/list')
  }
};

module.exports = controller;