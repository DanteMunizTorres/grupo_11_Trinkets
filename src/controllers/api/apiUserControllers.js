const path = require("path");
const { validationResult } = require('express-validator')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
//modelos de base de datos------
let User = require('../../database/models/User');
let Purchase = require('../../database/models/Purchase')