const mongoose = require("mongoose");

const User = new mongoose.Schema(
  {
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
  },
  { collection: "auth" }
);

const model = mongoose.model("UserData", User);

module.exports = model;
