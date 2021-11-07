

const controller = {
  product: (req, res) => {
    res.render('../views/product/product.ejs')
  },
  cart: (req, res) => {
    res.render('../views/product/cart.ejs')
  },
};

module.exports = controller;