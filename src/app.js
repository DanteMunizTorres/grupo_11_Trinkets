const express = require("express");
const session = require('express-session')
const cookies = require('cookie-parser')
const userLoggedMiddleware = require('./middlewares/userLoggedMiddleware')
const path = require("path");
const cors = require('cors');
const favicon = require('serve-favicon');

const server = express();


//--------------------------------------------------------------------------------


// TODO ESTNO NO HACE FALTA


//SEQUELIZER
//Probando conectar la base de datos manual, no funciono .sequlizerc

// const {sequelize: configDB, checkDBconection} = require('./database/config/config')
// checkDBconection(configDB)



// UserTable = require('./database/models/User')
// global.UserDB = UserTable;




//--------------------------------------------------------------------------------


// server.use(express.static(path.resolve(__dirname, "public")));
const publicPath = path.join(__dirname, "../public");
server.use(express.static(publicPath));


//configuracion EJS
server.set("views", path.resolve(__dirname, "./views"));
server.set("view engine", "ejs");

//capturar informacion de los formularios
server.use(express.urlencoded({extended: true}));
server.use(express.json())


//habilitar metodos http
const methodOverride = require('method-override');
server.use(methodOverride('_method'));

//configuracion de session
server.use(session({secret: 'Mensaje secreto',
                    resave: true,
                    saveUninitialized: true,
                    cookie: {
                        secure: false,
                        httpOnly: false
                      }}));



//middleware

server.use(cookies())
server.use(userLoggedMiddleware)

//cors------------------------
server.use(cors())





//api------------------------------

const apiProductRouter = require('./routes/api/apiProductRoutes')
server.use('/api/products', apiProductRouter)
const apiUserRouter = require('./routes/api/apiUserRoutes')
server.use('/api/users', apiUserRouter)

// --------------------------------


//rutas

const userRoutes = require('./routes/user-routes')
const productRoutes = require('./routes/product-routes')



let ImgProduct = require('./database/models/ImgProduct');

let imgs
ImgProduct.findAll()
    .then(result => {
        imgs = result.map(img => img.name)
        // console.log(imgs + '---------------------------------------');
        
    })
// console.log(imgs);

server.get('/', (req, res) => {
            res.render(path.join(__dirname, '/views/main/home.ejs'), {imgs})
        })

server.get('/home2', (req, res) => {
    res.render(path.join(__dirname, '/views/main/homeAlt.ejs'))
})



//User
server.use('/user', userRoutes);

//Product
server.use('/product', productRoutes);

//Favicon
server.use(favicon((__dirname, './public/img/logo/trinKets - favicon.ico')));


//Erro 404
server.get('/*', function(req, res){
    res.render('main/error404.ejs');
  });


//Hay que usar npm run dev
const port = process.env.PORT || 3030;
server.listen(port, () => {
    console.log('Servidor corriendo en puerto 3030')
})