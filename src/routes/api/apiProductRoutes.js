const express = require('express');
const router = express.Router();
const apiProductController = require('../../controllers/api/apiProductControllers');





// Listado de productos
router.get('/list', apiProductController.list)
router.get('/:id', apiProductController.productDetail);


module.exports = router;