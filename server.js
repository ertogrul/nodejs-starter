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
var port =  process.env.PORT || 3001;
var bodyParser = require('body-parser');


/*
var server = http.createServer(function (req, res) {
    if (req.method.toLowerCase() == 'get') {
        displayForm(res);
    } else if (req.method.toLowerCase() == 'post') {
        processAllFieldsOfTheForm(req, res);
    }

});


function displayForm(res) {
    fs.readFile('/public/pages/index.ejs', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}

function processAllFieldsOfTheForm(req, res) {
    var form = new formidable.IncomingForm();

    form.parse(req, function (err, fields, files) {
        //Store the data from the fields in your data store.
        //The data store could be a file or database or any other store based
        //on your application.
        res.writeHead(200, {
            'content-type': 'text/plain'
        });
        res.write('received the data:\n\n');
        res.end(util.inspect({
            fields: fields,
            files: files
        }));
    });
}*/


var app = express();

//------- setup express app
app.use('/public', express.static(process.cwd() + '/public'));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

//------- setup routes
routes(app);

//------- start the server
app.listen(port, function() {
  console.log('Server listening on port ' + port + '.........');
});
//http.createServer(app).listen(app.get(port), '0.0.0.0', function() {
//    console.log('Express server listening on port ' + app.get('port'));
//});

