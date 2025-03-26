import { config } from "dotenv";
import mongoose from "mongoose";


config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log("mongodb mufoqyatli yaratildi ✅")
  } catch (error) {
    console.log("Database yaratishda xatolik")
    process.exit(1)
  }
}

export default connectDB;