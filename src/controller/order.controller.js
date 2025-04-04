import { isValidObjectId } from "mongoose";
import ErrorHandler from "../utils/ErrorHandler.js";
import userModel from "../models/user.model.js";
import foodsModel from "../models/foods.model.js";
import orderModel from "../models/order.model.js";
import orderItemModel from "../models/order-item.model.js";

const createOrder = async(req, res, next) => {
  try {
    const { userId, orderItems } = req.body;

    if (!Array.isArray(orderItems) || orderItems.length === 0) {
      throw new ErrorHandler(400, "Buyurma taomlari tanlanishi shart!");
    }
    

    if(!isValidObjectId(userId)){
       throw new ErrorHandler(400, `Given ID ${userId} is not valid object ID`)
    }

    const user = await userModel.findById(userId)

    if(!user) {
      throw new ErrorHandler(404, "Foydalanuvchi topilmadi");
    }

    let totalPrice = 0;
    for(let oi of orderItems){
      const food = await foodsModel.findById(oi.foodId);

      if(!food) {
        throw new ErrorHandler(404, "taom topilmadi")
      }

      totalPrice += food.price * oi.quantity;
    }

    const order = new orderModel({
      totalPrice,
      user: userId
    });

    for(let oi of orderItems){
      const orderItem = new orderItemModel({
        food: oi.foodId,
        order: order._id,
        quantity: oi.quantity,
      });

      order.orderItems.push(orderItem._id);

      await orderItem.save();
    }

    await order.save();

    res.status(201).json({
      message: "Buyurtma Yaratildi",
    });

  } catch (error) {
    next(error)
  }
}

const getAllOrders = async (req, res, next) => {
  try {
    const orders = orderModel.find().populate("orderItem");

    res.status(200).send({
      message: "success",
      count: orders.length,
      data: orders
    })
  } catch (error) {
    next(error)
  }
}

export default { createOrder, getAllOrders }