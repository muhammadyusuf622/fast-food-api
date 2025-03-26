import mongoose, { Schema } from "mongoose";


const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    price: {
      type: Schema.Types.Number,
      required: [true, "mahsulot narxi berilishi shart"],
      min: [0, "Narx manfiy bo'lishi mumkin emas"]
    },
    description: {
      type: Schema.Types.String,
      required: false
    },
    imgUrl: {
      type: Schema.Types.String,
      required: false
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    }
  },
  {
    collection: "foods",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Foods", FoodSchema);
