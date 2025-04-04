import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({

  total_price: {
    type: mongoose.SchemaTypes.Number,
    required: true
  },

  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [
    {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "OrderItem",
  }
]
},
  {
    collection: "users",
    timestamps: true,
    versionKey: false
  });

export default mongoose.model("Order", OrderSchema);