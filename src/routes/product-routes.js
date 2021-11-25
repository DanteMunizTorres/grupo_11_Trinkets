const express = require('express');
const router = express.Router();

const productController = require('../controllers/productCntrl');

router.get('/cart', productController.cart);
router.get('/detail', productController.product);
router.get('/upload', productController.upload)
router.get('/list', productController.list)

module.exports = router;