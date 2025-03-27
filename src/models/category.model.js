import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String, 
      required: true,
      unique: true
    },
    foods: [
      {
        type: Schema.Types.ObjectId,
        ref: "Foods"
      },
    ],
  },
  {
    collection: "categories",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", CategorySchema);
