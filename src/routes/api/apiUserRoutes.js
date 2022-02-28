const express = require('express');
const router = express.Router();
const apiUserController = require('../../controllers/api/apiUserControllers');





// Listado de productos
router.get('/', apiUserController.list)
router.get('/:id', apiUserController.id);


module.exports = router;