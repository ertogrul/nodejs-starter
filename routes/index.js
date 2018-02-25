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
        req.session.memo = 0;  
        req.session.webquery = 0
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
           memo: zm1.memo,
           wynik2: zm1.webquery
        });
    });

    app.post('/calc/minus', function(req, res) {
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) - Number(req.body.inputNumber);
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: zm1.memo,
           wynik2: zm1.webquery
        });
    });

    app.post('/calc/multi', function(req, res) {
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) * Number(req.body.inputNumber);
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: zm1.memo,
           wynik2: zm1.webquery
        });
    });

    app.post('/calc/divide', function(req, res) {
        console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = Number(zm1.liczba) / Number(req.body.inputNumber);
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: zm1.memo,
           wynik2: zm1.webquery
        });
    });

    app.post('/calc/AC', function(req, res) {
        console.log(" AC button:" + req.body.inputNumber);
        var zm1 = req.session;
        zm1.liczba = 0
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: zm1.memo,
           wynik2: zm1.webquery
        });
    });
/*
MC > Clears the memory

MR > Recall value in memory

MS > Save value into memory
MS usage -> Make sure 0 is displayed. Now type 2 and multiply, then press MR and equal. You will get 100.

M+ > Adds the currently displayed number on your calculator to the number in memory

M- > Subtracts the currently displayed number from the number in memory
*/
    app.post('/calc/MS', function(req, res) {
        console.log(" Memory Store Button ");
        var zm1 = req.session;
        zm1.memo = zm1.liczba;
        console.log(zm1.memo);
        //var zm1 = req.session;
        //zm1.liczba = Number(req.body.inputNumber);
        
        res.render('pages/calc', {
           wynik: zm1.liczba,
           memo: zm1.memo, //zm1.liczba,
           wynik2: zm1.webquery
        });
    });

    app.post('/calc/MC', function(req, res) {
        console.log(" Memory Clear button:" + req.body.inputNumber);
        res.render('pages/calc', {
           wynik: 0,
           memo: 0,
           wynik2: 0
        });
    });

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
            wynik: zm1.liczba,
            memo: zm1.memo,
            wynik2: zm1.webquery
        });
    });
};