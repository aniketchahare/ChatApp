//Configure the database
require('./config/config');
require("./config/database");

var express = require("express");
var app = express();

var expressValidator = require('express-validator');

var bodyParser = require("body-parser");
var route = require('./Routes/routes');

//Create express app 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
//Define a simple route
app.use('/',route);
app.get('/', (req, res) => {
    res.json(
        {
            "Message": "Welcome to Chat App"
        })
});

//Listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
});