const { Pokemon } = require("./pokemon");
const { sequelize, Sequelize } = require("./db");

module.exports = {
  Pokemon,
  sequelize,
  Sequelize,
};
