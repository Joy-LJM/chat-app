// model layer used for dealing with data in the database and connect with controllers
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true, max: 50 },
  password: { type: String, required: true },
  isAvatarImageSet: {
    type: Boolean,
    default: false,
  },
  avatarImage: {
    type: String,
    default: "",
  },
});
module.exports = mongoose.model("userinfo", userSchema);
