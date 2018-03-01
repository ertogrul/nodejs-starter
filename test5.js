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
    var s = "you can enter maximum 500234234 + 4324234 = 2342340999 choices";
    var ss = contentsString.match(regex);
    console.log(ss)
    console.log(ss[0])
   








  })