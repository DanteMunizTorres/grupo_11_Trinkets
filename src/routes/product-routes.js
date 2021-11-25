const express = require('express');
const router = express.Router();

const productController = require('../controllers/productCntrl');

router.get('/cart', productController.cart);


// Listado de productos
router.get('/list', productController.list)

// 2. /products/create (GET)
// Formulario de creación de productos
router.get('/create', productController.create)

// 3. /products/:id (GET)
// Detalle de un producto particular
router.get('/detail/:id', productController.product);

// 4. /products (POST)
// Acción de creación (a donde se envía el formulario)
router.post('/create', productController.createNewProduct)
// 5. /products/:id/edit (GET)
// Formulario de edición de productos
router.get('/:id/edit', productController.edit);
// 6. /products/:id (PUT)
// Acción de edición (a donde se envía el formulario):
// router.put(, productController.createNewProduct)
// 7. /products/:id (DELETE)
// Acción de borrado









module.exports = router;