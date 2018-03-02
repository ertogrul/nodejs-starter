'use strict';
const http = require('http')
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
        req.session.memo = 0
        req.session.webquery = 0
        req.session.webquery2 = 0
        req.session.operation = ""
        res.render('pages/calc', {
            wynik: 0,
            memo: 0, 
            wynik2: 0,
            wynik3: req.session.webquery2
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
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
        });
    });

    app.post('/calc/minus', function(req, res) {
        //console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        //req.session.liczba = Number(req.session.liczba) - Number(req.body.inputNumber);
        req.session.operation += "-";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
        });
    });

    app.post('/calc/multi', function(req, res) {
        //console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        //req.session.liczba = Number(req.session.liczba) * Number(req.body.inputNumber);
        req.session.operation += "*";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
        });
    });

    app.post('/calc/divide', function(req, res) {
        //console.log(" THIS IS MINUS method:" + req.body.inputNumber);
        //req.session.liczba = Number(req.session.liczba) / Number(req.body.inputNumber);
        req.session.operation += "/";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
        });
    });

    app.post('/calc/AC', function(req, res) {
        console.log(" AC button:" + req.body.inputNumber);
        req.session.liczba = 0
        req.session.operation = "";
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
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
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
        });
    });

    app.post('/calc/MC', function(req, res) { 
        //console.log(" Memory Clear button:" + req.body.inputNumber);
        req.session.memo = 0;
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
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
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
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
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
        });
    });

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    app.post('/calc/webquery2', function(req, res) {
        var myQuery;
        var myQueryInput;
        var myQueryResult;
        var response;
        var url;

        console.log(" web scraping with http.request ");
        //req.session.webquery2 = req.body.inputQuery2;
        if (req.body.inputQuery2.includes("+")) {
            myQuery = req.body.inputQuery2.split("+");
            myQuery.push("%2B");
            myQueryInput = "http://www.ecosia.org/search?q=" + myQuery[0] + myQuery[2] + myQuery[1];
        }
        
        http.get(myQueryInput, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
            let error;
            if (statusCode !== 200) {
                error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            }
            if (error) {
                console.error(error.message);
                // consume response data to free up memory
                res.resume();
                return;
            }
            res.setEncoding('utf8');
            let rawData = '';
            res.on('data', (chunk) => { rawData += chunk; });
            res.on('end', () => {
                try {
                console.log(rawData);
                var dataString = rawData.toString();
                var regex = /\d+\s.\s\d+\s\B=\s\d+/;
                //regex: a + b = c
                var calcResult = dataString.match(regex);
                console.log(calcResult)
                console.log(calcResult[0])
                } catch (e) {
                console.error(e.message);
                }
            });
            }).on('error', (e) => {
            console.error(`Got error: ${e.message}`);
        });



        /*
        const bl = require('bl');
        
        http.get(process.argv[2], function (response) {
            response.pipe(bl(function (err, data) {
                if (err) {
                    return console.error(err)
                }
                data = data.toString()
                console.log(data.length)
                console.log(data)
            }))
        })
        */
        /*
        url = myQueryInput
        console.log("url: " + url)
        http.get(url, function(response){
            var result = "";
            response.setEncoding("utf-8");
            response.on("data", function(data){
                result += data;
                console.log("data: " + data)
            });
        
            response.on("end", function(){
                console.log("result.length: " + result.length);
                console.log("result: " + result);
            });

        });
        */
        /*
        http.get(url, function (response) {
            response.setEncoding('utf8')
            response.on('data', function (data) {
            console.log(data);
            })
        });*/
    

        
        res.render('pages/calc', {
           wynik: req.session.liczba,
           memo: req.session.memo,
           wynik2: req.session.webquery,
           wynik3: req.session.webquery2
        });
    });





    app.post('/calc/webquery', function(req, res) { 
        console.log("webscraping " + req.body.inputQuery);

        var myQuery;
        var myQueryInput;
        var myQueryResult;
        if (req.body.inputQuery.includes("+")) {
            myQuery = req.body.inputQuery.split("+");
            myQuery.push("%2B");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + myQuery[2] + myQuery[1];

        }
        if (req.body.inputQuery.includes("-")) {
            myQuery = req.body.inputQuery.split("-");
            myQuery.push("-");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + "+" + myQuery[2] + "+" + myQuery[1];
        }
        if (req.body.inputQuery.includes("*")) {
            myQuery = req.body.inputQuery.split("*");
            myQuery.push("*");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + "+" + myQuery[2] + "+" + myQuery[1];
        }
        if (req.body.inputQuery.includes("/")) {
            myQuery = req.body.inputQuery.split("/");
            myQuery.push("/");
            myQueryInput = "https://www.ecosia.org/search?q=" + myQuery[0] + "+" + myQuery[2] + "+" + myQuery[1];
        }
        
        console.log("My Query Input: " + myQueryInput);

        osmosis
            .get(myQueryInput)
            //.find('.col-sm-12 p')
            .find('.col-sm-12 .widget-result')
            .set('result')
            .data(console.log)
            .data(function (listing) {
                console.log("A: " + listing.result)   
                req.session.webquery = listing.result; 
                console.log("session.webquery" + req.session.webquery)
                
                res.render('pages/calc', {
                    wynik: req.session.liczba,
                    memo: req.session.memo,
                    wynik2: req.session.webquery,
                    wynik3: req.session.webquery2
                }); 
            });

            });
/*
        res.render('pages/calc', {
            wynik: req.session.liczba,
            memo: req.session.memo,
            wynik2: req.session.webquery
        }); 
    });
*/

    // NUMBER BUTTONS
    app.post('/calc/BSeven', function(req, res) {
        req.session.liczba = 7;
        req.session.operation += "7"; 
        console.log(" req.session.operation: " + req.session.operation);       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BEight', function(req, res) {
        req.session.liczba = 8; 
        req.session.operation += "8"; 
        console.log(" req.session.operation: " + req.session.operation);         
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BNine', function(req, res) {
        req.session.liczba = 9;
        req.session.operation += "9";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BFour', function(req, res) {
        req.session.liczba = 4;
        req.session.operation += "4";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BFive', function(req, res) {
        req.session.liczba = 5;
        req.session.operation += "5";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BSix', function(req, res) {
        req.session.liczba = 6;
        req.session.operation += "6";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BOne', function(req, res) {
        req.session.liczba = 1;
        req.session.operation += "1";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BTwo', function(req, res) {
        req.session.liczba = 2;
        req.session.operation += "2";       
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BThree', function(req, res) {
        req.session.liczba = 3;
        req.session.operation += "3";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BZero', function(req, res) {
        req.session.liczba = 0;
        req.session.operation += "0";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BDot', function(req, res) {
        req.session.liczba = ".";
        req.session.operation += ".";        
        res.render('pages/calc', {
            wynik: req.session.liczba = req.session.operation,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });
    app.post('/calc/BEquals', function(req, res) {
        req.session.liczba  = eval(req.session.operation);
        req.session.operation = String(req.session.liczba);
        //console.log(" req.session.operation: " + req.session.operation);      
        res.render('pages/calc', {
            wynik: req.session.liczba,
            memo: req.session.memo,
            wynik2: req.session.webquery,
            wynik3: req.session.webquery2
        });
    });

};