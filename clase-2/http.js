const http = require("node:http");

const desiredPort = process.env.PORT ?? 1234;

const processRequest = (req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    res.end("Bienvenido a mi página de inicio");
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
*/
