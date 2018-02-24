'use strict';
var http = require('http');
var fs = require('fs');
var util = require('util');
var express = require('express');
var routes = require('./routes/index.js');
var port = process.env.PORT || 3001;
var session = require('express-session');
var bodyParser = require('body-parser')

var app = express();

app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

routes(app);

app.listen(port, function() {
  console.log('Server listening on port ' + port + '.........');
});