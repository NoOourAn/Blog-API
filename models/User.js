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
    password: {
      type: String,
      required: [true, "can't be blank"],
    },
    loggedIn: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", usersSchema);
module.exports = User;
