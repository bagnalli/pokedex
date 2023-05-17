const express = require("express");
const app = express.Router();
const middleware = require("./middleware");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const authenticateUser = require("./authMiddleware");

const JWT_SECRET = process.env.JWT_SECRET;

app.use(middleware);

// LOGIN

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      res.status(401).send("You need to be a user to view this.");
      return;
    }
    const isAMatch = await bcrypt.compare(password, user.password);
    if (isAMatch) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
      );
      res.setHeader("Authorization", `Bearer ${token}`); // Set Authorization header
      res.send({ message: "success", token });
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.send(error);
  }
});

// POST /register

app.post("/register", async (req, res, next) => {
  const { username, title, firstName, lastName, password } = req.body;
  const hashedPW = await bcrypt.hash(password, 10);
  const { id, username: createdUsername } = await User.create({
    username,
    title,
    firstName,
    lastName,
    password: hashedPW,
  });
  const token = jwt.sign({ id, username }, JWT_SECRET);
  res.status(200).send({ message: "success", token });
});

// error handling middleware, so failed tests receive them
app.use((error, req, res, next) => {
  console.error("SERVER ERROR: ", error);
  if (res.statusCode < 400) res.status(500);
  res.send({ error: error.message, name: error.name, message: error.message });
});

module.exports = app;
