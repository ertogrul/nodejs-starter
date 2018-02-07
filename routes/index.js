'use strict';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('pages/index', {
          dupa_key : "dupa_value"
        });
    });

    app.get('/about', function(req, res) {
        res.render('pages/about');
    });

    app.get('/calc', function(req, res) {
        console.log("req.query: " + req.query);
        var wynik = "";
        if (req.query && req.query.number1 && req.query.operation && req.query.number2) {
            wynik = eval(req.query.number1 + req.query.operation + req.query.number2);
        }        
        res.render('pages/calc', { wynik : wynik });
    });
};
