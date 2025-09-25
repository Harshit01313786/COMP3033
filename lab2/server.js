// server.js
const connect = require('connect');
const url = require('url');

const app = connect();

app.use((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (req.method === 'GET' && pathname === '/lab2') {
    const method = query.method;
    const x = parseFloat(query.x);
    const y = parseFloat(query.y);

    if (!method || isNaN(x) || isNaN(y)) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing or invalid parameters' }));
      return;
    }

    let result;
    switch (method) {
      case 'add':
        result = x + y;
        break;
      case 'subtract':
        result = x - y;
        break;
      case 'multiply':
        result = x * y;
        break;
      case 'divide':
        result = y !== 0 ? x / y : 'Division by zero error';
        break;
      default:
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ error: 'Invalid method' }));
        return;
    }

    const output = {
      x: query.x,
      y: query.y,
      operation: method,
      result: result.toString()
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(output));
    return;
  }

  res.statusCode = 404;
  res.end('Not Found');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
