const express = require("express");
const app = express.Router();
const middleware = require("./middleware");

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

// error handling middleware, so failed tests receive them
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;
