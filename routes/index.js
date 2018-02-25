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
        //req.session.liczba = 0;
        req.session.liczba = ""
        req.session.memo = 0;  
        req.session.webquery = 0
        req.session.operation = ""
        res.render('pages/calc', {
            wynik: 0,
            memo: 0, 
            wynik2: 0
        });
    });
    

    app.post('/calc/plus', function(req, res) {
        //console.log(" THIS IS PLUS method:" + req.body.inputNumber);
        //req.session.liczba = Number(req.session.liczba) + Number(req.body.inputNumber);
        req.session.operation += "+";
        //console.log(" req.session.operation: " + req.session.operation);
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });

    app.post('/calc/minus', function(req, res) {
        //console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        //req.session.liczba = Number(req.session.liczba) - Number(req.body.inputNumber);
        req.session.operation += "-";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });

    app.post('/calc/multi', function(req, res) {
        //console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        //req.session.liczba = Number(req.session.liczba) * Number(req.body.inputNumber);
        req.session.operation += "*";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });

    app.post('/calc/divide', function(req, res) {
        //console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        //req.session.liczba = Number(req.session.liczba) / Number(req.body.inputNumber);
        req.session.operation += "/";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });

    app.post('/calc/AC', function(req, res) {
        console.log(" AC button:" + req.body.inputNumber);
        req.session.liczba = 0
        req.session.operation = "";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
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
        req.session.memo = req.session.liczba;
        console.log(req.session.memo);
        
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });

    app.post('/calc/MC', function(req, res) { 
        //console.log(" Memory Clear button:" + req.body.inputNumber);
        req.session.memo = 0;
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });

    app.post('/calc/MPlus', function(req, res) {
        console.log(" M+ ");
        //Adds the currently displayed number on your calculator to the number in memory
        req.session.memo = Number(req.session.memo) + Number(req.session.liczba);
        console.log(req.session.memo);
        
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });

    app.post('/calc/MMinus', function(req, res) {
        console.log(" M- ");
        //Subtracts the currently displayed number from the number in memory
        req.session.memo = Number(req.session.memo) - Number(req.session.liczba);
        console.log(req.session.memo);
        
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery
        });
    });



    app.post('/calc/webquery', function(req, res) { 
        console.log("webscraping " + req.body.inputQuery);
        req.session.webquery = req.body.inputQuery;        
        //rozdzielić "3+4" na "3" "+" "7"
        var myQuery;
        var myQueryInput;
        var myResult;
        if (req.session.webquery.includes("+")) {
            myQuery = req.session.webquery.split("+");
            myQuery.push("%2B");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + myQuery[2] + myQuery[1];

        }
        if (req.session.webquery.includes("-")) {
            myQuery = req.session.webquery.split("-");
            myQuery.push("-");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + "+" + myQuery[2] + "+" + myQuery[1];
        }
        if (req.session.webquery.includes("*")) {
            myQuery = req.session.webquery.split("*");
            myQuery.push("*");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + "+" + myQuery[2] + "+" + myQuery[1];
        }
        if (req.session.webquery.includes("/")) {
            myQuery = req.session.webquery.split("/");
            myQuery.push("/");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + "+" + myQuery[2] + "+" + myQuery[1];
        }
        
        console.log(myQuery);
        console.log(myQueryInput);
        
        osmosis
            .get(myQueryInput)
            //.find('.col-sm-12 p')
            .find('.col-sm-12 .widget-result')
            .set('result')
            .data(console.log)
        

        console.log("process.argv " + process.argv[0]);
        console.log("process.argv " + process.argv[1]);
        console.log("process.argv " + process.argv[2]);
        console.log("process.argv " + process.argv[3]);
        console.log("process.argv " + process.argv[4]);
        




        res.render('pages/calc', {
            wynik: req.session.liczba,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });

    // NUMBER BUTTONS
    app.post('/calc/BSeven', function(req, res) {
        req.session.liczba = 7;
        req.session.operation += "7"; 
        console.log(" req.session.operation: " + req.session.operation);       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BEight', function(req, res) {
        req.session.liczba = 8; 
        req.session.operation += "8"; 
        console.log(" req.session.operation: " + req.session.operation);         
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BNine', function(req, res) {
        req.session.liczba = 9;
        req.session.operation += "9";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BFour', function(req, res) {
        req.session.liczba = 4;
        req.session.operation += "4";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BFive', function(req, res) {
        req.session.liczba = 5;
        req.session.operation += "5";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BSix', function(req, res) {
        req.session.liczba = 6;
        req.session.operation += "6";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BOne', function(req, res) {
        req.session.liczba = 1;
        req.session.operation += "1";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BTwo', function(req, res) {
        req.session.liczba = 2;
        req.session.operation += "2";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BThree', function(req, res) {
        req.session.liczba = 3;
        req.session.operation += "3";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BZero', function(req, res) {
        req.session.liczba = 0;
        req.session.operation += "0";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BDot', function(req, res) {
        req.session.liczba = ".";
        req.session.operation += ".";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });
    app.post('/calc/BEquals', function(req, res) {
        req.session.liczba  = eval(req.session.operation);
        req.session.operation = String(req.session.liczba);
        //console.log(" req.session.operation: " + req.session.operation);      
        res.render('pages/calc', {
            wynik: req.session.liczba,
            memo: req.session.memo,
            wynik2: req.session.webquery
        });
    });

};