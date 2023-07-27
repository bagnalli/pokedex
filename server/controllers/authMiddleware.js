const jwt = require("jsonwebtoken");
const { User } = require("../db");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

const authenticateUser = async (req, res, next) => {
  try {
    console.log("Authenticating user...");
    const auth = req.header("Authorization");
    if (!auth) {
      return res.status(401).send("Not Authenticated");
    }

    const [, token] = auth.split(" ");

    try {
      const userObj = jwt.verify(token, JWT_SECRET);
      const user = await User.findByPk(userObj.id);
      req.user = user;
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).send("Invalid token");
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(403).send("Token expired");
      }
      throw error; // Pass the error to the error-handling middleware
    }
  } catch (error) {
    next(error);
  }
};

module.exports = authenticateUser;
