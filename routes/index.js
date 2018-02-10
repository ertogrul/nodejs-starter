'use strict';

module.exports = function(app) {
    app.get('/', function(req, res) {
        res.render('pages/index', {
          dupa_key : "dupa_value"
        });
    });

    app.get('/about', function(req, res) {
        res.render('pages/about')
    });
   
    app.get('/calc', function(req, res) {  
        res.render('pages/calc', {
            wynik2: "xxxxx",
            wynik: 0
        });
    });
    

    app.post('/calc/plus', function(req, res) {
        //console.log(req.body.todo + " is added to top of the list.");
        console.log(" THIS IS PLUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) + Number(req.body.inputNumber);

        res.render('pages/calc', {
            wynik2 : "aaaaaa",
           wynik: zm1.liczba
        });
    });

    app.post('/calc/minus', function(req, res) {
        //console.log(req.body.todo + " is added to top of the list.");
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) - Number(req.body.inputNumber);
        
        res.render('pages/calc', {
            wynik2 : "aaaaaa",
           wynik: zm1.liczba
        });
    });

        app.post('/calc/multi', function(req, res) {
        //console.log(req.body.todo + " is added to top of the list.");
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) * Number(req.body.inputNumber);
        
        res.render('pages/calc', {
            wynik2 : "aaaaaa",
           wynik: zm1.liczba
        });
    });

        app.post('/calc/divide', function(req, res) {
        //console.log(req.body.todo + " is added to top of the list.");
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) / Number(req.body.inputNumber);
        
        res.render('pages/calc', {
            wynik2 : "aaaaaa",
           wynik: zm1.liczba
        });
    });





};