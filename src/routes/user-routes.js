const express = require('express');
const router = express.Router();

const userController = require('../controllers/userCntrl');

router.get('/register', userController.getRegister);
router.get('/login', userController.getLogin);

router.post('/new-user', userController.newUser)



module.exports = router;