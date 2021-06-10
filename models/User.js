const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      index: true,
      maxlength: 20,
    },
    email: {
      type: String,
      required: [true, "can't be blank"],
      unique: true,
      index: true,
      validate: {
        validator: function (email) {
          var emailRegex = new RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*")
          return emailRegex.test(email)
        },
        message: "please enter valid email."
      },
    },
    password: {
      type: String,
      required: [true, "can't be blank"],
    },
    loggedIn: {
      type: Boolean,
      default: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);
module.exports = User;
