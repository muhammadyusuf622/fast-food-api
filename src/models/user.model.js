import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
      match: /^(9[012345789]|6[125679]|7[0123456789]|3[3]|8[8]|2[0]|5[05])[0-9]{7}$/
    },
    imageUrl: {
      type: String,
      required: false,
      default: "https://example.com/default-avatar.jpg"
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    collection: "users",
    timestamps: true,
    versionKey: false
  }
);

export default mongoose.model("Users", userSchema);
