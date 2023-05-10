const express = require("express");
const app = express.Router();
const middleware = require("./middleware");
const { Pokemon } = require("../db");

app.use(middleware);

app.get("/", async (req, res, next) => {
  try {
    res.send(`
        <h1>Welcome to the prototype Pokedex</h1>
        <p>Pokemon can be access at /pokemon</p>
        <p>Users should log in through /login</p>
        <p>New? please use /register</p>
        `);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = app;
