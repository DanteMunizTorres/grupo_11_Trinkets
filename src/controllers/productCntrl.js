

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
};

module.exports = controller;