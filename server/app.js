const express = require("express");
const app = express();
const middleware = require("./controllers/middleware");

const indexRoutes = require("./controllers/index");
const pokemonRoutes = require("./controllers/pokemonRoutes");
const userRoutes = require("./controllers/userRoutes");

app.use(middleware);

app.use("/", indexRoutes);
app.use("/pokemon", pokemonRoutes);
app.use("/", userRoutes);
app.use("/", userRoutes);

// MIDDLEWARE

// 404 handler
app.use((req, res) => {
  res.status(404).send({
    error: "404 - Not Found",
    message: "No route found for the requested URL",
  });
});

// error handling middleware
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({
    error: error.message,
    name: error.name,
    message: error.message,
    table: error.table,
  });
});

module.exports = app;
