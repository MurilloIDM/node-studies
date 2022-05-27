const http = require("http");

http.createServer((req, res) => {
  res.write(`
    <html>
      <head>
        <title>Hello World</title>
      </head>
      <body>
        <h1>Hello World and Murillo!</h1>
      </body>
    </html>
  `);

  res.end();
}).listen(3412);