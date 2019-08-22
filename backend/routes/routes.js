var express = require('express');
var routes = express.Router();

var tokenVerification = require('../middleware/tokenVerification');
var userCtrl = require('../controller/userControl');

//registration api
routes.post('/register', userCtrl.registerController);
//login api
routes.post('/login', userCtrl.loginController);
//forgot password api
routes.post('/forgot', userCtrl.forgotPasswordController);
//reset password api
routes.post('/reset/:token',  tokenVerification.checkToken, userCtrl.resetPasswordController);

module.exports = routes;