const express = require("express");
const server = express();

const path = require("path");

const publicPath = path.join(__dirname, "./public");
server.use(express.static(publicPath));

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

server.listen(3030, () => {
    console.log('Servidor corriendo')
})