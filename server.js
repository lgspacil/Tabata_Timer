var express = require("express");
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost/tabata_app');

var app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './public/dist')));

//setting up mongoose configs
require('./server/config/mongoose.js');

// define routes and controllers
//this is where all the logic is done.....
var routes = require('./server/config/routes.js')(app)

const port = process.env.PORT || 8080

app.listen(port, function() {
    console.log("listening on port 8080");
})





