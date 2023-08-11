const express = require("express");
const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT ?? 1234;

app.get("/", (req, res) => {
  res.send("<h1>Hola viejo</h1>");
});

app.post("/pokemon", (req, res) => {
  let body = "";

  req.on("data", (chuck) => {
    body += chuck.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);
    data.timestamp = Date.now();

    console.log("recurso creado", { data });
    res.status(201).json(data);
  });
});

app.listen(PORT, () => {
  console.log(`servidor escuchando en puerto ${PORT}`);
});

//https://www.youtube.com/watch?v=YmZE1HXjpd4&t=1604s
