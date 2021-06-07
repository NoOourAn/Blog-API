const posts = require("./posts");
const users = require("./users");
const login = require("./login");
const error = require("./error");
const comments = require("./comments");

const routes = {
  login,
  users,
  posts,
  comments,
  error,
};

module.exports = routes;

