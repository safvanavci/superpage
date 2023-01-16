const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, require: true },
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    image: { type: String, require: false },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", UserSchema);
module.exports = User;
