const http = require('http');

http.get('http://www.google.pl/search?dcr=0&source=hp&q=16+%2B+6', (res) => {
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