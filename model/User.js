const mongoose = require("mongoose");

const user_model = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    minlength: 6,
  },
  role: {
    type: Number,
    default: 1, // 1=user, 2=admin
  },
  image: String,
  token: String,
  token_exp: Number,
});

const User = mongoose.model("user", user_model);

module.exports = { User };
