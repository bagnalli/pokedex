const app = require("./app");
const { sequelize } = require("./db");

// const { PORT = 4000 } = process.env;
const port = 3000;

app.listen(port, () => {
  sequelize.sync({ force: false });
  console.log(`Users are ready at http://localhost:${port}`);
});
