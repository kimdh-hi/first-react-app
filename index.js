const express = require("express");
const app = express();
const port = 3000;

// Connect to MongoDB.
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://dhkim:a929199@cluster0.p17hn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB connected")) // success message
  .catch(err => console.log(err)); // error message

app.get("/", (req, res) => res.send("Hello World!!"));

app.listen(port, () => console.log(`React start on ${port}`));
