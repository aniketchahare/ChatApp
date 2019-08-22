//Configure the database
require('./config/config');
var mongodb = require("./config/database");

var express = require("express");
//express app is use to starts a server and listen on port for connection
var app = express();

var cors = require('cors');

var expressValidator = require('express-validator');

var bodyParser = require("body-parser");
var route = require('./routes/routes');

app.use(express.static('../frontend'));
//Create express app 
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

app.use(cors());
//Define a simple route
app.use('/',route);
app.get('/', (req, res) => {
    res.json(
        {
            "Message": "Welcome to Chat App"
        });
});

//Listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
    mongodb.connect;
});