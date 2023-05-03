const { Pokemon } = require("./pokemon");
const { User } = require("./User");
const { sequelize, Sequelize } = require("./db");

module.exports = {
  Pokemon,
  User,
  sequelize,
  Sequelize,
};
