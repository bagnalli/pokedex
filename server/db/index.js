const { Pokemon } = require("./Pokemon");
const { User } = require("./User");
const { sequelize, Sequelize } = require("./db");

User.belongsToMany(Pokemon, { through: "pokemonSeen" });
Pokemon.belongsToMany(User, { through: "pokemonSeen" });

module.exports = {
  Pokemon,
  User,
  sequelize,
  Sequelize,
};
