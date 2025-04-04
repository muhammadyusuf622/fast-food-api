import mongoose from "mongoose";

const OrderItemSchema = mongoose.Schema({

  food: {
    type: mongoose.SchemaTypes.ObjectId,
    required: true
  },

  order: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Order",
    required: true,
  },

  quantity: {
    type: mongoose.SchemaTypes.Int32,
    required: true,
    min: 1,
    max: 1000,
    default: 1,
  },
},
  {
    collection: "users",
    timestamps: true,
    versionKey: false
  });

export default mongoose.model("OrderItem", OrderItemSchema);