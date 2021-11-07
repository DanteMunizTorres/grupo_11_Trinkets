const express = require('express');
const router = express.Router();

const productController = require('../controllers/productCntrl');

router.get('/cart', productController.cart);
router.get('/detail', productController.product);

module.exports = router;