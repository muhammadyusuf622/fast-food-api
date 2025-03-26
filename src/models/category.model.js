import mongoose, { Schema } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: Schema.Types.String,  // **SchemaType o‘rniga Schema.Types ishlatilgan**
      required: true,             // **"require" o‘rniga "required" yozilgan**
      unique: true
    },
  },
  {
    collection: "categories",
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Category", CategorySchema);
