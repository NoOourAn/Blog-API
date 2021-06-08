require('dotenv').config()
const express = require("express");
const { login, users, posts, comments, error, imgUpload, recaptcha} = require("./routes/index");
const LogMiddleware = require("./middlewares/logger");
require("./db-connection");
const cors = require("cors");

const app = express();
//cross origin
app.use(cors());
//set up json body parser
app.use(express.json());

///use Log middleware
app.use(LogMiddleware)

//Upload Image Router
app.use("/api", imgUpload);

//ReCaptcha Router
app.use("/api", recaptcha);

//Login Router
app.use("/api/login", login);

//Users Router
app.use("/api/users", users);

//Posts Router
app.use("/api/posts", posts);

//Comments Router
app.use("/api/posts", comments);

//error route
app.use("**", error);

////////////////
//// PORT | HOSTNAME
const hostname = process.env.HOST;
const port = process.env.PORT;

module.exports = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});
