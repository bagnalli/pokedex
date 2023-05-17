const request = require("supertest");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

process.env.JWT_SECRET = "neverTell";
const SALT_COUNT = 10;
const { JWT_SECRET } = process.env;

const app = require("../app");
const { sequelize, Pokemon, User } = require("../db");
const seed = require("../seeders/seedFn");
const { kittens } = require("../seeders/seedData");

const createTestUser = async (userData) => {
  const hashed = await bcrypt.hash(userData.password, SALT_COUNT);
  user = await User.create({ username: userData.username, password: hashed });
  const { id, username: createdUsername } = user;
  token = jwt.sign({ id, username: createdUsername }, JWT_SECRET);
  return { user, token };
};

describe("Endpoints", () => {
  const testKittenData = {
    name: "Missingno",
    number: 876,
    type1: "grass",
    type2: "fire",
    description: "testing the desc",
  };
  const testUserData = {
    username: "red",
    title: "PM",
    firstName: "red",
    lastName: "der",
    password: "redtest",
  };
  let user;
  let pokemon;
  let token;
  let registerResponse;
  let loginResponse;

  beforeAll(async () => {
    await sequelize.sync({ force: true }); // recreate db
    await seed();
    registerResponse = await request(app)
      .post("/register")
      .send(testUserData)
      .catch((err) => console.error(err));
    loginResponse = await request(app)
      .post("/login")
      .send(testUserData)
      .catch((err) => console.error(err));
  });

  describe("GET /", () => {
    it("should return correct html", async () => {
      const registerResponse = await request(app).get("/");
      expect(registerResponse.status).toBe(200);
      expect(registerResponse.text).toBe(`
      <h1>Welcome to the prototype Pokedex</h1>
      <p>Pokemon can be access at /pokemon</p>
      <p>Users should log in through /login</p>
      <p>New? please use /register</p>
      `);
    });
  });

  // LOGIN AND REGISTER TESTS //
  // REGISTER
  describe("login and register", () => {
    describe("POST /register", () => {
      it("should send back success with token", async () => {
        expect(registerResponse.status).toBe(200);
        expect(registerResponse.body).toEqual({
          message: "success",
          token: expect.stringMatching(
            /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/
          ),
        });
      });
      it("should create user with username", async () => {
        const foundUser = await User.findOne({ where: { username: "red" } });
        expect(foundUser).toBeTruthy();
        expect(foundUser.username).toBe("red");
      });
      it("should hash password", async () => {
        const foundUser = await User.findOne({ where: { username: "red" } });
        expect(foundUser).toBeTruthy();
        expect(foundUser.password).not.toBe(testUserData.password);
        expect(foundUser.password).toEqual(
          expect.stringMatching(/^\$2[ayb]\$.{56}$/)
        );
      });
    });

    // LOGIN TESTS

    describe("POST /login", () => {
      it("should send back success with token", async () => {
        expect(loginResponse.status).toBe(200);
        expect(loginResponse.body).toEqual({
          message: "success",
          token: expect.stringMatching(
            /^[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+\.[a-zA-Z0-9\-_]+$/
          ),
        });
      });
      it("if password incorrect, should send back 401 unauthorized, with message", async () => {
        const incorrectLoginResponse = await request(app)
          .post("/login")
          .send({
            username: "red",
            password: "notright",
          })
          .catch((err) => console.error(err));
        expect(incorrectLoginResponse.status).toBe(401);
        expect(incorrectLoginResponse.text).toBe("Unauthorized");
      });
    });
  });
});
