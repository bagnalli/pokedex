const { Sequelize, sequelize } = require("./db");

const Pokemon = sequelize.define("pokemon", {
  name: Sequelize.STRING,
  number: Sequelize.NUMBER,
  type1: Sequelize.STRING,
  type1: Sequelize.STRING,
  description: Sequelize.STRING,
});

module.exports = { Pokemon };
