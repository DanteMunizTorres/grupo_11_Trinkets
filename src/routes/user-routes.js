const express = require('express');
const router = express.Router();

let fs = require('fs')
const path = require("path");

const multer = require('multer');
let multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    let folder = path.join(__dirname, '../../public/img/users');
    cb(null, folder);
  },
  filname: (req, file, cb)=>{
    let imgName = 'avatar_' + Date.now + path.extname(file.originalName);
    cb(null, imgName)
  }
})
let fileUpload = multer({storage: multerDiskStorage})

const userController = require('../controllers/userCntrl');

router.get('/register', userController.getRegister);
router.get('/login', userController.getLogin);

router.post('/new-user', fileUpload.single(avatar-img), userController.newUser)



module.exports = router;