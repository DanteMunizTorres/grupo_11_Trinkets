
let fs = require('fs')
const path = require("path");

const multer = require('multer');
let multerDiskStorage = multer.diskStorage({
  destination: (req, file, cb)=>{
    console.log(req.body)
    let folder = path.join(__dirname, '../../public/img/products');
    cb(null, folder);
  },
  filename: (req, file, cb)=>{
    let imgName = 'prd_' + Date.now() + path.extname(file.originalname);
    req.body.imgName = imgName;
    cb(null, imgName)
  }
})
let fileUpload = multer({storage: multerDiskStorage})

module.exports = fileUpload;