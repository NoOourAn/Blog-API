require('dotenv').config()
require("./db-connection");
const express = require("express");
const { login, users, posts, comments, error, imgUpload, recaptcha, smsService, activateAccount } = require("./routes/index");
const LogMiddleware = require("./middlewares/logger");
const ValidateAPIKeyMiddleware = require("./middlewares/apiKeys");
const cors = require("cors");


const app = express();
//cross origin
app.use(cors());

//set up json body parser
app.use(express.json());

///use Log and apiKeys middleware
app.use(LogMiddleware)
app.use(ValidateAPIKeyMiddleware)

//Upload Image Router
app.use("/api", imgUpload);

//ReCaptcha Router
app.use("/api", recaptcha);

//Sms Service Router
app.use("/api", smsService);

//Sms Service Router
app.use("/api", activateAccount);

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

const server = app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`);
});

module.exports = server

////////////Handling Notification Service
const io = require('socket.io')(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
    credentials: true
  }
});
io.on('connection', (socket) => {
  console.log("socket connected")

  socket.on("disconnect", () => {
    console.log("socket disconnected")
  })

  socket.on("send-notifications", (data) => {
    io.emit("new-notification", data)
  })
});

