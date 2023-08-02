/*const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Arpita'); 
  res.end();
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});  */

/*const http = require('http');

const hostname = '127.0.0.1';
const port = 4000;

const server = http.createServer((req, res) => {
  if (req.url === '/print-name') {
    console.log('Name: Arpita');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Name printed on the server!');
  } else {
    res.statusCode = 404;
    res.end('Invalid route!');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

*/