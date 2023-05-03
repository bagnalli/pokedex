const { Sequelize, sequelize } = require("./db");

const User = sequelize.define("user", {
  username: Sequelize.STRING,
  title: Sequelize.STRING,
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  password: Sequelize.STRING,
});

module.exports = { User };
