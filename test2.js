const http = require('http');


//http.get('http://nodejs.org/dist/index.json', (res) => {
//http.get('http://www.ecosia.org/search?q=16%2B+3', (res) => {
//http.get('http://www.google.pl/search?dcr=0&source=hp&q=16+%2B+6', (res) => {
//http.get('http://www.qwant.com/?q=5*7', (res) => {
http.get('http://www.qwant.com', (res) => {

  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
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
      //const parsedData = JSON.parse(rawData);
      //console.log(parsedData);
      console.log(rawData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});