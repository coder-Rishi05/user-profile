import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: String,
  name: String,
  age: Number,
  email: String,
  password: String,
  post: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
});

const userModel =  mongoose.model("User", userSchema);

export default userModel;
