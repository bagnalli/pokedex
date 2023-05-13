const express = require("express");
const app = express.Router();
const middleware = require("./middleware");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

app.use(middleware);

// Verifies token with jwt.verify and sets req.user
// Authentication middleware

app.use(async (req, res, next) => {
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else {
    const [, token] = auth.split(" ");
    const userObj = jwt.verify(token, JWT_SECRET);
    const user = await User.findByPk(userObj.id);
    req.user = user;
    next();
  }
});

// LOGIN

app.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: { username },
    });
    if (!user) {
      res.sendStatus(401);
      return;
    }
    const isAMatch = await bcrypt.compare(password, user.password);
    if (isAMatch) {
      const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET
      );
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

module.exports = app;
