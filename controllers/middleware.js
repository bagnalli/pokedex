// Store middleware for reuse in other files
const express = require("express");

const middleware = express();

middleware.use(express.json());
middleware.use(express.urlencoded({ extended: true }));

module.exports = middleware;
