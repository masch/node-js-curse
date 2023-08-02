const fs = require("node:fs");
const http = require("node:http");

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  if (req.url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.end("Bienvenido a mi página de inicio");
  } else if (req.url === "/imagen-super-bonita.png") {
    fs.readFile("./imagen-super-bonita.png", (error, data) => {
      if (error) {
        res.statusCode = 500;
        res.end("<h1>500 Internal server error</h1>");
      } else {
        res.setHeader("Content-Type", "image/png");
        res.end(data);
      }
    });
  } else if (req.url === "/contacto") {
    res.end("<h1>Contacto</h1>");
  } else {
    res.statusCode = 404;

    // res.statusCode = 103

    res.end("<h1>404<h1>");
  }
};

const server = http.createServer(processRequest);

server.listen(desiredPort, () => {
  console.log(`server listining on port http://localhost:${desiredPort}`);
});

// seguir: https://youtu.be/YmZE1HXjpd4

/*
    - Browser hace dos requests, el primero para la api y el segundo para pedir el favicon.
    - Request: url, headers, method (GET), {body (opcional segun el metodo)}
    - Response: statusCode, headers, body

    Cambios....
    StatusCodes
      100-199 : Resp informativas
      200-299: 
*/
