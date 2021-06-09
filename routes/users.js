const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPassword, prepareToken } = require("./helper");

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
    const { username, password } = req.body;
    if (username && password) {
      ///to check if username and email unique
      const FoundUser = await User.findOne({ username }).exec();
      if (FoundUser) throw new Error("username already exists");

      const user = await User.create({
        username,
        password: await hashPassword(password),
        posts: [],
      });

      //prepare token for user
      const token = await prepareToken(user.id)

      ///send response
      res.json({ success: true, message: "user created Successfully", token });
    } else throw new Error("username and password are required");
  } catch (err) {
    res.json({ success: false, message: err.message }); ///head to the same page with error msg
  }
});

//////ADMIN functionality
// router.delete("/:id", async (req, res) => {
//   ///delete POST
//   try {
//     console.log(req.params)
//     const { id } = req.params;
//     const post = await User.findOneAndDelete({ _id: id });
//     const obj = {
//       success: true,
//       message: post ? "user deleted successfully" : "post not found",
//     };
//     res.send(obj);
//   } catch (err) {
//     res.json({ success: false, message: err.message });
//   }
// });

module.exports = router;
