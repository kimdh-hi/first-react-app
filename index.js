const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

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
app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(201).json({ success: true });
  });
});

app.listen(port, () => console.log(`React start on ${port}`));
