const express = require("express");
const app = express.Router();
const middleware = require("./middleware");
const { Pokemon } = require("../db");

app.use(middleware);

// GET REQUESTS
// GET all pokemon

app.get("/", async (req, res, next) => {
  try {
    const pokemons = await Pokemon.findAll();
    const pokemonData = pokemons.map((pokemon) => {
      const { name, number, type1, type2, description } = pokemon;
      return { number, name, type1, type2, description };
    });
    res.send(pokemonData);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// GET specific pokemon by id

app.get("/:name", async (req, res, next) => {
  try {
    const pokemonName = req.params.name;
    const pokemon = await Pokemon.findOne({ where: { name: pokemonName } });

    if (!pokemon) {
      res.sendStatus(404);
      return;
    }
    const { name, number, type1, type2, description } = pokemon;
    res.send({ number, name, type1, type2, description });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// POST REQUEST - add to the database

app.post("/", async (req, res, next) => {
  try {
    const { name, number, type1, type2, description } = req.body;
    const newPokemon = await Pokemon.create({
      name,
      number,
      type1,
      type2,
      description,
    });
    res.status(201).send({
      name,
      number,
      type1,
      type2,
      description,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

// DELETE REQUEST

app.delete("/:name", async (req, res) => {
  try {
    // Get pokemon
    const pokemonName = req.params.name;
    const pokemon = await Pokemon.findOne({ where: { name: pokemonName } });

    if (!pokemon) {
      res.sendStatus(404);
      return;
    }

    await Pokemon.destroy({ where: { name: pokemonName } });
    res.sendStatus(204);
  } catch (error) {
    res.send(error);
  }
});

// UPDATE REQUEST

app.put("/:name", async (req, res, next) => {
  try {
    const pokemonName = req.params.name;
    const pokemon = await Pokemon.findOne({ where: { name: pokemonName } });
    if (!pokemon) {
      res.sendStatus(404);
    } else {
      pokemon.update(req.body);
      res.json(`${pokemon["name"]} was updated!`);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = app;
