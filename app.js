import express from "express";
import connectDB from "./src/config/db.js";
import userModel from "./src/models/userModel.js";
import cookieParser from "cookie-parser";

connectDB();
const app = express();

app.set("view engine","ejs")
app.use(express.json())
app.use(express.urlencoded({urlencoded:true}))
app.use(cookieParser())

app.get("/", (req, res) => {
  res.render("index");
});



app.listen(3000, () => {
  console.log("serever running at : 3000");
});
