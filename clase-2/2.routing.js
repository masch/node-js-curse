const http = require("node:http");

const dittoJSON = require("./pokemon/ditto.json");

const processRequest = (req, res) => {
  const { method, url } = req;

  switch (method) {
    case "GET":
      switch (url) {
        case "/pokemon/ditto": {
          res.setHeader("Content-type", "application/json; charset=utf-8");
          return res.end(JSON.stringify(dittoJSON));
        }

        default: {
          res.statusCode = 404;
          res.setHeader("Content-type", "text/plain; charset=utf-8");
          return res.end("404 not found");
        }
      }
  }
};

const server = http.createServer(processRequest);

server.listen(1234, () => {
  console.log("server listening on port 1234");
});
