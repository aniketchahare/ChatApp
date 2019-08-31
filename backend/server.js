//Configure the database
require('./config/config');
var mongodb = require("./config/database");
var userCtrl = require('./controller/chatControl');

var connections = [];

var express = require("express");
var socketIO = require('socket.io');

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
app.use('/', route);
app.get('/', (req, res) => {
    res.json(
        {
            "Message": "Welcome to Chat App"
        });
});

var server = app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
    mongodb.connect;
});

const io = socketIO(server);

io.on('connection', (socket) => 
{
    console.log('user is connected');
    socket.on('new message', function(message) {
        console.log("listening new message", message);
        userCtrl.chatController(message, (err, data) =>
        {
            console.log('new message from user--> ', message)
            if(err)
            {
                console.log("Error..", err);
            }
            else
            {
                console.log(message, "new message");
                io.emit(message.receiverid, message);
            }
        })
    })

    socket.on('disconnect' , ()=> {
        console.log("user is disconnected");
    })
});