const express = require("express");
const ditto = require("./pokemon/ditto.json");

const PORT = process.env.PORT ?? 1234;

const app = express();

app.disable("x-powered-by");

app.use(express.json());

/*
app.use((req, res, next) => {
  if (req.method !== "POST") return next();
  if (req.headers["content-type"] !== "application/json") return next();
  console.log("arranca el post");
  // solo llegan requests que son POST y su header tiene Content-Type: application/json
  let body = "";

  req.on("data", (chuck) => {
    body += chuck.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();

    console.log("test post");
    // mutar la request y guardarla en el req.body
    req.body = data;
    next();
  });
});
*/

app.get("/", (req, res) => {
  res.send("<h1>Hola viejo</h1>");
});

app.get("/pokemon/ditto", (req, res) => {
  res.json(ditto);
});

app.post("/pokemon", (req, res) => {
  req.body.timestamp = Date.now();

  return res.status(201).json(req.body);
});

app.use((req, res) => {
  res.status(404).send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`servidor escuchando en puerto ${PORT}`);
});

// https://www.youtube.com/watch?v=-9d3KhCqOtU&list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&index=3
