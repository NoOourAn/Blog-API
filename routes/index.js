const posts = require('./posts');
const users = require('./users');
const login = require('./login');
const error = require('./error');
const comments = require('./comments');
const imgUpload = require('./ImgUpload')

const routes = {
  login,
  users,
  posts,
  comments,
  error,
  imgUpload
};

module.exports = routes;

