import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  date: {
    type: Date,
    default: Date.now,
  },
  content: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const postModel =  mongoose.model("Post", postSchema);

export default postModel;
