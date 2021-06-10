const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPassword, prepareEmailToken } = require("./helper");
const AuthMiddleware = require("../middlewares/auth");
const mail = require("../email_service/mailer-service");

///////////////////////////////////
///api to get all USERS
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.send(users ? users : []);
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//////////////////////////
///api to get One USER by user Id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const user = await User.findOne({ _id: id }, { password: 0 });
    user ? res.send(user) : res.status(404).json({ success: false, message: "No User exist with this ID" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//////////////////////////////////////
///to create new user (register)
router.post("/", async (req, res) => {
  ///the api handling
  try {
    const { username, email, password } = req.body;
    if (username && email && password) {
      ///to check if username and email unique
      const FoundUser = await User.findOne({$or:[{username},{email}]}).exec();
      if (FoundUser) throw new Error("username or email already exists");

      const user = await User.create({
        username,
        email,
        password: await hashPassword(password),
        posts: [],
      });

      //prepare token to activate user
      const token = await prepareEmailToken(user.id)

      //send Confirmation Mail to the user
      mail(email, username, token)

      ///send response
      res.json({ success: true, message: "user created Successfully"});
    } else throw new Error("username, email and password are required");
  } catch (err) {
    res.json({ success: false, message: err.message }); ///head to the same page with error msg
  }
});

//////Delete User ---Only user can DELETE his Acccount
router.delete("/:id", AuthMiddleware, async (req, res) => {
  ///delete POST
  try {
    const { id } = req.params;
    const user_id = req.decodeData.id;
    if (id === user_id) {
      const user = await User.findOneAndDelete({ _id: id });
      const obj = {
        success: true,
        message: user ? "user deleted successfully" : "user not found",
      };
      res.send(obj);
    } else throw new Error("Not Authorized");
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;
