'use strict';
const osmosis = require('osmosis');

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
        req.session.liczba = 0;  
        res.render('pages/calc', {
            wynik: 0,
            memo: 0, 
            wynik2: 0
        });
    });
    

    app.post('/calc/plus', function(req, res) {
        console.log(" THIS IS PLUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) + Number(req.body.inputNumber);
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: 0,
           wynik2: 0
        });
    });

    app.post('/calc/minus', function(req, res) {
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) - Number(req.body.inputNumber);
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: 0,
           wynik2: 0
        });
    });

    app.post('/calc/multi', function(req, res) {
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) * Number(req.body.inputNumber);
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: 0,
           wynik2: 0
        });
    });

    app.post('/calc/divide', function(req, res) {
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) / Number(req.body.inputNumber);
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: 0,
           wynik2: 0
        });
    });

    app.post('/calc/AC', function(req, res) {
        console.log(" AC button:" + req.body.inputNumber);
        res.render('pages/calc', {
           wynik: 0,
           memo: 0,
           wynik2: 0
        });
    });
    //  <-------------------------------------------------------------------
    app.post('/calc/MS', function(req, res) {
        console.log(" Memory Store Button ");
        var zm1 = req.session;
        zm1.memo = req.session.get(wynik); <--------------------- JAK ZROBIC GET TO MIEJSCA WYNIK ???????
        console.log(zm1.memo);
        //var zm1 = req.session;
        //zm1.liczba = Number(req.body.inputNumber);
        
        res.render('pages/calc', {
           wynik: 0,
           memo: 0 , //zm1.liczba,
           wynik2: 0
        });
    });
/*
    app.post('/calc/MC', function(req, res) {
        console.log(" MC button:" + req.body.inputNumber);
        res.render('pages/calc', {
           wynik: 0,
           memo: 0,
           wynik2: 0
        });
    });
*/
    app.post('/calc/webquery', function(req, res) {
        console.log("webscraping " + req.body.inputQuery);
        var zm1 = req.session;
        zm1.webquery = req.body.inputQuery;        
        

        /*
        osmosis
            .get('https://www.ecosia.org/search?q=12+*+4')
            //.find('.col-sm-12 p')
            .find('.col-sm-12 .widget-result')
            .set('result')
            .data(console.log)
        */
        res.render('pages/calc', {
            wynik: 0,
            memo: 0,
            wynik2: zm1.webquery
        });
    });
};