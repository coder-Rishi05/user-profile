import express from "express";
import connectDB from "./src/config/db.js";
import userModel from "./src/models/userModel.js";
import cookieParser from "cookie-parser";
import bcrypt, { hash } from "bcryptjs";
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

app.get("/register", (req, res) => {
  console.log(req.body);
  res.render("register", { data: req.body });
});

app.post("/register", async (req, res) => {
  const { username, name, age, email, password } = req.body;
  const exist = await userModel.findOne({ email });
  if (exist) return res.status(500).json({ message: "user exist already" });

  //   bcrypt.genSalt(10, (err, salt) =>{

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, salt) => {
      let user = await userModel.create({
        username,
        name,
        age,
        email,
        password: hash,
      });
     let token = jwt.sign({ email: email, userid: user._id }, "secretKey");
    });
  });
});

app.get("/data", (req, res) => {});

app.listen(3000, () => {
  console.log("serever running at : 3000");
});
