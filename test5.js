var fs = require('fs')

file = "/Users/michal.kordyzon@pl.ibm.com/_u/bc-hello/rawData.txt"
fs.readFile(file, function (err, contents) {
    if (err) {
      return console.log(err)
    }
    var contentsString = contents.toString()
    var startPosition = contentsString.indexOf("display:inline;font-size:138%");
    console.log("startPosition: " + startPosition);
    //var calcResult = contentsString.substring(startPosition+10, startPosition+100);
    //console.log("calcResult: " + calcResult);
    
    var regex = /\d+\s.\s\d+\s\B=\s\d+/;
    //regex: a + b = c
    var calcResult = contentsString.match(regex);
    console.log(calcResult);
    console.log(calcResult[0]);
  })