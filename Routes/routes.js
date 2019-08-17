var express = require('express');
var routes = express.Router();

var userCtrl = require('../Controller/userControl');

routes.post('/register', userCtrl.registerController);
routes.post('/login', userCtrl.loginController);

module.exports = routes;