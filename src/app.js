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

//capturar informacion de los formularios
server.use(express.urlencoded({extended: false}));
server.use(express.json())

//habilitar metodos http
const methodOverride = require('method-override');
server.use(methodOverride('_method'));


//rutas
const mainRoutes = require('./routes/main-routes')
const userRoutes = require('./routes/user-routes')
const productRoutes = require('./routes/product-routes')

server.get('/', (req, res) => {
    res.render(path.join(__dirname, '/views/main/home.ejs'))
})


//User
server.use('/user', userRoutes);

//Product
server.use('/product', productRoutes);



server.listen(port, () => {
    console.log('Servidor corriendo en puerto 3030')
})