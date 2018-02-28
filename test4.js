/*const http = require('http')

console.log(http.METHODS)
*/

var request = require('request');
//request('http://www.google.com', function (error, response, body) {
request('http://www.ecosia.org/search?q=5%2B6', function (error, response, body) {	
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

