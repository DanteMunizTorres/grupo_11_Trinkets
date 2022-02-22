const express = require('express');
const router = express.Router();

const productController = require('../controllers/productCntrl');

//configuracion de multer
const fileUpload = require('../middlewares/product-multerStorage')

//configuracion de validaciones del formulario de creacion de producto
const validationProductForm = require('../middlewares/product-validations')
//middleware para imprimir por consola debuuging




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
router.post('/create', fileUpload.array('image'), validationProductForm, productController.createNewProduct) //logre subir las imagenes pero la validacion crashea
// 5. /products/:id/edit (GET)
// Formulario de edición de productos
router.get('/:id/edit', productController.editForm);
// 6. /products/:id (PUT)
// Acción de edición (a donde se envía el formulario):
router.put('/:id/edit', fileUpload.array('image'), validationProductForm, productController.edit)
// 7. /products/:id (DELETE)
// Acción de borrado
router.delete('/delete-product/:id', productController.delete)
//Buscar productos en product-list
router.post('/search', productController.search)









module.exports = router;