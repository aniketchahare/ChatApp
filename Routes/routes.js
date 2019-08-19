var express = require('express');
var routes = express.Router();

var tokenVerification = require('../middleware/tokenVerification');
var userCtrl = require('../Controller/userControl');

routes.post('/register', userCtrl.registerController);
routes.post('/login', userCtrl.loginController);
routes.post('/forgot', userCtrl.forgotPasswordController);
routes.post('/reset/:token',  tokenVerification.checkToken, userCtrl.resetPasswordController);

module.exports = routes;