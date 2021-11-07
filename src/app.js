const express = require("express");
const server = express();
const port = process.env.PORT || 3030;

const path = require("path");

// server.use(express.static(path.resolve(__dirname, "public")));
const publicPath = path.join(__dirname, "../public");
server.use(express.static(publicPath));


//configuracion EJS
server.set("views", path.resolve(__dirname, "views"));
server.set("view engine", "ejs");


//rutas
const mainRoutes = require('./routes/main-routes')
const userRoutes = require('./routes/user-routes')
const productRoutes = require('./routes/product-routes')


//controllers
//const productController = require('./controllers/productCntrl');
//const userController = require('./controllers/userCntrl');


server.get('/', (req, res) => {
    res.render(path.join(__dirname, '/views/main/home.ejs'))
})


//User
// server.get('/register', userController.register);
// server.get('/login', userController.login);
server.use('/user', userRoutes);

//Product
// server.get('/cart', productController.cart);
// server.get('/product', productController.product);
server.use('/product', productRoutes);



server.listen(port, () => {
    console.log('Servidor corriendo en puerto 3030')
})