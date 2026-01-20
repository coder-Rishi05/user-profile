import mongoose from "mongoose";

const userSchema =  mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
});

const userModel = new mongoose.model("user", userSchema);

export default userModel;
