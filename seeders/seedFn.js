const { sequelize } = require("../db");
const { Pokemon } = require("../db");
const { pokemon } = require("./seedData");

const seed = async () => {
  await sequelize.sync({ force: true }); // recreate db
  await Pokemon.bulkCreate(pokemon);
};

module.exports = seed;
