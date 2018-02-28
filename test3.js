const http = require('http');

/*
http.get("http://www.example.org/", response => {
  console.log(`Status: ${response.statusCode}`);
}).on('error', err => {
  console.log("Error: " + err.message);
});
*/

http.request({
   //host: "www.example.org",
   host: 'http://www.ecosia.org',
   //host: 'www.google.com',
   method: 'GET',
   //path: "/?q=5*7"
   path: "/search?q=5%2B6"
}, function(response) {
   response.setEncoding("utf8");
   response.on("readable", () => console.log(response.read()));
}).end();
