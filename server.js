var express = require('express');
var cookieParser = require('cookie-parser');
var session      = require('express-session');
var passport = require('passport'); //core passport library initialized here
var app = express();


var connectionString = 'mongodb://127.0.0.1:27017/webdev_2018';
//mongodb://<dbuser>:<dbpassword>@ds147228.mlab.com:47228/heroku_60kmwpkc

// if(process.env.MONGODB_DB_PASSWORD) {
//     connectionString = "mongodb://" + process.env.MONGODB_DB_USERNAME + ":" +
//         process.env.MONGODB_DB_PASSWORD + "@" +
//         process.env.MONGODB_DB_HOST + '.mlab.com:' +
//         process.env.MONGODB_DB_PORT + '/' +
//         process.env._APP_NAME;
// }


var mongoose = require("mongoose");
mongoose.connect(connectionString);



var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* VVVIP : session has to be initialized AFTER Cookie Parser */
app.use(cookieParser());
//app.use(session({secret: process.env.SESSION_SECRET}));
app.use(session({secret: "aasdasd"}));


// First initialize passport and then tell it to use the express    session
app.use(passport.initialize());
app.use(passport.session());

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

var port = process.env.PORT || 3000;


var project = require("./project/app.js");
project(app);


app.listen(port,() => console.log(`API running on localhost:${port}`));

