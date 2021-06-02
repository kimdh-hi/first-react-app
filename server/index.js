const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");

const config = require("./config/key");
const { User } = require("./model/User");

// Connect to MongoDB.
const mongoose = require("mongoose");
mongoose
  .connect(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connected")) // success message
  .catch(err => console.log(err)); // error message

// body-parser option setting
app.use(bodyParser.urlencoded({ extended: true })); // application/x-www-form-urlencoded 타입
app.use(bodyParser.json()); // application/json 타입

app.get("/", (req, res) => res.send("Hello World!!"));

// 회원가입
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);

  // Bcrypt 암호화
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(201).json({ success: true });
  });
});

// 로그인
app.post("/api/users/login", (req, res) => {
  console.log("login...........");
  // 데이터베이스에서 로그인 요청된 이메일 있는지 조회
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "Not exist email",
      });
    }
    // 이메일이 조회되었다면 비밀번호를 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "Wrong password",
        });
      }
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // save token (cookie, local storage)
        res.cookie("x_auth", user.token).status(200).json({
          loginSuccess: true,
          userId: user._id,
        });
      });
    });
  });
});

/*
  auth: 미들웨어
*/
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`React start on ${port}`));
