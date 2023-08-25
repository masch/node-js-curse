const express = require("express"); // require --> comonJS
const crypt = require("node:crypto");
const movies = require("./movies.json");

const app = express();
app.use(express.json);
app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.json({ message: "hola mundo" });
});

// Todos los rescursos que sean MOVIES se identifican con /movies
app.get("/movies", (req, res) => {
  const { genre } = req.query;
  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLocaleLowerCase())
    );

    return res.json(filteredMovies);
  }

  res.json(movies);
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  const movie = movies.find((movie) => movie.id === id);
  if (movie) return res.json(movie);

  return res.status(404).json({ message: "Movie not found" });
});

app.post("/movies", (req, res) => {
  const { title, genre, director, year, duration, rate, poster } = req.body;

  const newMovie = {
    id: crypt.randomUUID(),
    title,
    genre,
    director,
    year,
    duration,
    rate: rate ?? 0,
    poster,
  };

  // Esto no es REST, porque estamos guardando el estado en memoria
  movies.push(newMovie);

  res.status(201).json(newMovie);
});

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});

// https://youtu.be/-9d3KhCqOtU?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&t=907
// viernes 25/08: https://youtu.be/-9d3KhCqOtU?list=PLUofhDIg_38qm2oPOV-IRTTEKyrVBBaU7&t=2523