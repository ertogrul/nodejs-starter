'use strict';

//session - uruchom // sprawdz req.session
//kalkulator

//------- getting modules
var http = require('http');
var fs = require('fs');
//var formidable = require('formidable');
var util = require('util');
var express = require('express');
var routes = require('./routes/index.js');
var port = process.env.PORT || 3001;
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();

//------- setup express app
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.urlencoded({ extended : false }));
app.set('view engine', 'ejs');


app.use(session({
    secret: 'keyboard cat',
    //cookie: { maxAge: 60000 },
    //name: cookie_name,
    //store: sessionStore, // connect-mongo session store
    //proxy: true,
    resave: true,
    saveUninitialized: true
}));

//------- setup routes
routes(app);

//------- start the server
app.listen(port, function() {
  console.log('Server listening on port ' + port + '.........');
});