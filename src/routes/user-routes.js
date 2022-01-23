const express = require('express');
const router = express.Router();

const userController = require('../controllers/userCntrl');

router.get('/register', userController.getRegister);
router.get('/login', userController.getLogin);

module.exports = router;