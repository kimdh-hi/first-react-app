const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // sault의 자리수
const jwt = require("jsonwebtoken");

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

// save메서드 호출 전에 수행
user_model.pre("save", function (next) {
  var user = this;

  // password필드가 변경된 때에만 수행
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      // salt 생성
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, encPassword) {
        if (err) return next(err);
        user.password = encPassword;
        next();
      });
    });
  } else {
    // 비밀번호의 변경이 아닌 경우
    next();
  }
});

user_model.methods.comparePassword = function (plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    else return cb(null, isMatch);
  });
};

user_model.methods.generateToken = function (cb) {
  var user = this;

  var token = jwt.sign(user._id.toHexString(), "user_secret");
  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

const User = mongoose.model("user", user_model);

module.exports = { User };
