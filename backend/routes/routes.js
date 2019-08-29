var express = require('express');
var routes = express.Router();

var tokenVerification = require('../middleware/tokenVerification');
var userCtrl = require('../controller/userControl');
var chatCtrl = require('../controller/chatControl');

//registration api
routes.post('/register', userCtrl.registerController);
//login api
routes.post('/login', userCtrl.loginController);
//forgot password api
routes.post('/forgot', userCtrl.forgotPasswordController);
//reset password api
routes.post('/reset/:token',  tokenVerification.checkToken, userCtrl.resetPasswordController);

//get all users api
routes.get('/getAllUsers', userCtrl.getAllUserController);
//get all chat api
routes.get('/getAllChat', chatCtrl.getAllChatController);

module.exports = routes;