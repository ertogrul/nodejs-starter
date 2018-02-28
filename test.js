const http = require('http');
const querystring = require('querystring');

// w ODPOWIEDZI: STATUS 404

const postData = querystring.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: 'www.qwant.com',
  port: 80,
  //path: '/upload',
  path: '/?q=5*7',
  //method: 'POST'
  method: 'GET',
  /*headers: {
    //'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }*/
};

const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  res.on('end', () => {
    console.log('No more data in response.');
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// write data to request body
req.write(postData);
req.end();


/*var a = "2";
var b = "5";
var oper = "/";
var wynik = "";

if (a && b) {
	console.log(wynik = eval(a + oper + b));
}*/