'use strict';

//------- getting modules

var express = require('express');
var  routes = require('./routes/index.js');
var http = require('http');
var  port =  process.env.PORT || 3001;
// process.env returns object containing user environment
//var fs = require('fs');
var server = http.createServer(function (req, res) {
    displayForm(res);
});


function displayForm(res) {
    //fs.readFile('form.html', function (err, data) {
    fs.readFile('/views/pages/calc.ejs', function (err, data) {
        res.writeHead(200, {
            'Content-Type': 'text/html',
                'Content-Length': data.length
        });
        res.write(data);
        res.end();
    });
}


var app = express();
// wystartowanie modulu express

//------- setup express app
app.use('/public', express.static(process.cwd() + '/public'));
// montowanie middleware
// ?middleware function is executed when base matches path?
// process sluzy do dostepu do komend cli
// process.cwd() - returns directory where you invoked 'node' command.

app.set('view engine', 'ejs'); // use ejs template engine

//------- setup routes
routes(app);

//------- start the server
app.listen(port, function() {
  console.log('Server listening on port ' + port + '.........');
});
