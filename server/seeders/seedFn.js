const { sequelize } = require("../db");
const { Pokemon, User } = require("../db");
const { pokemon, user } = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Pokemon.bulkCreate(pokemon);
  await User.bulkCreate(user);
};

module.exports = seed;
