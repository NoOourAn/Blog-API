const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { hashPassword } = require("./helper");

///////////////////////////////////
///api to get all USERS
router.get("/", async (req, res) => {
  try {
    users = await User.find({}, { password: 0 });

    const obj = {
      success: true,
      users: users.length ? users : [], ///if no users return empty list
    };
    res.send(obj);
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

//////////////////////////
///api to get One USER by user Id
router.get("/:id", async (req, res) => {
  try {
    const {id} = req.params
    user = await User.findOne({ _id: id }, { password: 0 });

    const obj = {
      success: true,
      user: user ? user : "user not found", ///if no users return empty list
    };
    res.send(obj);
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

      await User.create({
        username,
        password: await hashPassword(password),
        posts: [],
      });

      ///send response
      res.json({ success: true, message: "user created Successfully" });
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
