import express from "express";
import connectDB from "./src/config/db.js";
import userModel from "./src/models/userModel.js";
import postModel from "./src/models/post.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connectDB();
const app = express();

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ urlencoded: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/register", async (req, res) => {
  const { username, name, age, email, password } = req.body;

  console.log(req.body);

  const exist = await userModel.findOne({ email });

  if (exist) return res.status(400).send("user exist already");

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user

  const user = await userModel.create({
    username,
    name,
    age,
    email,
    password: hashedPassword,
  });

  // generate jwt token

  let token = jwt.sign({ email, userid: user._id }, "secretKey");
  //setting cookie
  res.cookie("token", token);

  //
  res.status(200).send("user registered sucessfully");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    let token = jwt.sign({ email, userid: user._id }, "secretKey");
    //setting cookie
    res.cookie("token", token);
    res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

app.get("/profile", isLoggedIn, (req, res) => {
  console.log(req.user);
  res.send("profile page");
});

// creating middleware for protecting the routes

function isLoggedIn(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send("Login first");
  }

  try {
    const data = jwt.verify(token, "secretKey");
    req.user = data;
    next();
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
}

app.listen(3000, () => {
  console.log("serever running at : 3000");
});
