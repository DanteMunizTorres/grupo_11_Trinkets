const express = require("express");
const server = express();
const port = process.env.PORT || 3030;

const path = require("path");

const publicPath = path.join(__dirname, "../public");
server.use(express.static(publicPath));

//configuracion EJS
server.set("views", path.resolve(__dirname, "views"));
server.set("view engine", "ejs");
server.use(express.static(path.resolve(__dirname, "public")));


//rutas
const mainRoutes = require('./routes/main-routes')
const userRoutes = require('./routes/user-routes')
const productRoutes = require('./routes/product-routes')


server.get('/', (req, res) => {
    res.render(path.join(__dirname, '/views/home.ejs'))
})

server.get('/register.html', (req, res) => {
    res.render(path.join(__dirname, './views/user/register.ejs'))
})

server.get('/cart.html', (req, res) => {
    res.render(path.join(__dirname, './views/product/cart.ejs'))
})

server.get('/product.html', (req, res) => {
    res.render(path.join(__dirname, './views/product/product.ejs'))
})

server.get('/login.html', (req, res) => {
    res.render(path.join(__dirname, './views/user/login.ejs'))
})







server.listen(port, () => {
    console.log('Servidor corriendo en puerto 3030')
})