import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(
      "mongodb://127.0.0.1:27017/miniproject",
    );
    console.log("database connected sucessfully", connect);
    return connect;
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
