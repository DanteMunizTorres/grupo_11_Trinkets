const express = require("express");
const server = express();
const port = process.env.PORT || 3030;

const path = require("path");

const publicPath = path.join(__dirname, "./public");
server.use(express.static(publicPath));


const ENDPOINTS = require('./routes/main-routes')




server.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './views/home.html'))
})

server.get('/register.html', (req, res) => {
    res.sendFile(path.join(__dirname, './views/register.html'))
})

server.get('/cart.html', (req, res) => {
    res.sendFile(path.join(__dirname, './views/cart.html'))
})

server.get('/product.html', (req, res) => {
    res.sendFile(path.join(__dirname, './views/product.html'))
})

server.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, './views/login.html'))
})







server.listen(port, () => {
    console.log('Servidor corriendo en puerto 3030')
})