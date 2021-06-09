const posts = require('./posts');
const users = require('./users');
const login = require('./login');
const error = require('./error');
const comments = require('./comments');
const imgUpload = require('./imgUpload')
const recaptcha = require('./recaptcha')

const routes = {
  login,
  users,
  posts,
  comments,
  error,
  imgUpload,
  recaptcha
};

module.exports = routes;

