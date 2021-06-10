const users = require('./routes/users');
const comments = require('./routes/comments');
const posts = require('./routes/posts');
const login = require('./routes/login');
const error = require('./routes/error');
const imgUpload = require('./features/imgUpload');
const recaptcha = require('./features/recaptcha');
const smsService = require('./features/SmsService')
const activateAccount = require('./features/activateAccount')


const routes = {
  login,
  users,
  posts,
  comments,
  error,
  imgUpload,
  recaptcha,
  smsService,
  activateAccount
};

module.exports = routes;

