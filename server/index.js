const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();
const PostModel = require("./models/postModel");
const UserModel = require("./models/userModel");
const app = express();
const jwt = require("jsonwebtoken");
app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://newuser:l7kySscr1cngiEv7@cluster0.d1jr7kr.mongodb.net/blog"
  )
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => {
    console.log(err);
  });

app.post("/", (req, res) => {
  const { title, content } = req.body;
  const post = new PostModel({ title: title, content: content });
  try {
    post.save();
    res.send("Post Created successfully");
  } catch {
    res.send("Error");
  }
});
app.post("/register", async (req, res) => {
  const { name, password, email } = req.body;
  const hash = await bcrypt.hash(password, 10);
  const user = new UserModel({
    name: name,
    email: email,
    password: hash,
  });
  try {
    user.save();
    res.send(true);
  } catch {
    res.send("error");
  }
});
app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  const response = await UserModel.find({ name: name });

  bcrypt
    .compare(password, response[0].password)
    .then((resp) => {
      if (resp) {
        const user = { name: name };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
        res.json({ accessToken: accessToken });
        
      } else res.send(false);
    })
    .catch((error) => console.log(error));
});
app.get("/posts", (req, res) => {
  PostModel.find({})
    .then((response) => res.send(response))
    .catch((error) => res.send(error));
});
app.post("/find", async (req, res) => {
  let { title } = req.body;

  const response = await PostModel.find({
    title: { $regex: title, $options: "i" },
  });
  console.log(title);
  res.send(response);
});

app.post("/find/:id", async (req, res) => {
  const { id } = req.params;
  // console.log(id);
  const response = await PostModel.find({ _id: id });
  res.send(response);
});

app.get("/newpost", authenticateToken, (req, res) => {
  res.json({ loggedIn: true });
});
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("Listening in port 3000");
});
