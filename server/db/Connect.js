import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// Connect to MongoDB
async function connect() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}
export { connect };
