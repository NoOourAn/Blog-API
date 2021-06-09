const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { prepareToken } = require("./helper")

//to post the registered user info. (login)
router.post("/", async (req, res) => {
  ///the api handling
  try {
    const { username, password } = req.body;
    if (username && password) {
      ///to check if username exists
      const user = await User.findOne({ username }).exec();
      if (!user) throw new Error("wrong username or password!!");
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw new Error("wrong username or password!!");

      //prepare token for user
      const token = await prepareToken(user.id)
      const obj = {
        success: true,
        message: "logged in successfully",
        token,
      };
      res.json(obj);
    } else throw new Error("username and password are required");
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

module.exports = router;

////send confirmation mail to the user
// sendConfirmationMail(email,username);
