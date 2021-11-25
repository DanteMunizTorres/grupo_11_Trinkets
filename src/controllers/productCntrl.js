let fs = require('fs')
const path = require("path");

const controller = {
  product: (req, res) => {
    res.render('../views/product/product-detail.ejs')
  },
  upload: (req, res) => {
    res.render('../views/product/product-upload.ejs')
  },
  cart: (req, res) => {
    res.render('../views/product/cart.ejs')
  },
  list: (req, res) => {

    let productsListJSON = fs.readFileSync(path.join(__dirname,'../data/products.json'), {encoding: 'utf-8'});
    let productList = JSON.parse(productsListJSON);
    
    res.render('../views/product/products-list.ejs', {productList})
  }
};

module.exports = controller;