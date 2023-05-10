const express = require("express");
const app = express();
const middleware = require("./controllers/middleware");

const indexRoutes = require("./controllers/index");
// const pokemonRoutes = require('');
// const userRoutes = require('');

app.use(middleware);

app.use("/", indexRoutes);

module.exports = app;
