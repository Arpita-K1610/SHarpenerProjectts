const http = require('http');

const port = 5000;

let currentMessage = '';

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    const form = getForm();
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(form);
  } else if (req.method === 'POST' && req.url === '/') {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      const { message } = parseFormData(body);
      if (message) {
        currentMessage = message;
      }
      res.writeHead(302, { Location: '/' });
      res.end();
    });
  } else {
    res.writeHead(404);
    res.end('Not Found');
  }
});

const getForm = () => {
  return `
    <html>
      <head>
        <title>Message Form</title>
      </head>
      <body>
        <p>${currentMessage}</p>
        <form method="POST" action="/">
          <input type="text" name="message" placeholder="Enter your message" required/>
          <button type="submit">Send</button>
        </form>
      </body>
    </html>
  `;
};

const parseFormData = (data) => {
  const formData = {};
  const params = new URLSearchParams(data);
  for (let [key, value] of params) {
    formData[key] = value;
  }
  return formData;
};

server.listen(port, () => {
  console.log(`Server running on port:  http://localhost:${port}`);
});