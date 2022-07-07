import mongoose from "mongoose";

const MONGO_URL = "mongodb://localhost/startup-place-interview-db";

export default async function connectDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to Database: ${MONGO_URL}`);
  } catch (error: any) {
    console.log(`Failed to connect to DB: ${error.message}`);
  }
}
