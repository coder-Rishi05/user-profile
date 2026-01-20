import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("welcome to home page");
});

app.listen(3000, () => {
  console.log("serever running at : 3000");
});
