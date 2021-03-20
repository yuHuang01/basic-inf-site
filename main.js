const http = require('http');
const url = require('url');
const fs = require('fs');

http.createServer((req, res) => {
  const urlObj = url.parse(req.url, true);
  let filename = '.' + urlObj.pathname;
  if(filename === './'){
    fs.readFile('./index.html', (err, data) => {
      if (err) {
        res.writeHead(404, {'Content-Type': 'text/html'});
        return res.end('The page you were looking was not found!');
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end()
    })
  } else {
    filename += '.html';
    fs.readFile(filename, (err, data) => {
      if (err) {
        return fs.readFile('./404.html', (err, data404) => {
          res.writeHead(404, {'Content-Type': 'text/html'})
          res.write(data404);
          return res.end();
        })
      }
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      return res.end()
    })
  }
}).listen(8080);
