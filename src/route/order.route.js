import { Router } from "express";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createOrderSchema } from "../schema/order.schema.js";
import orderController from "../controller/order.controller.js";


const orderRoute = Router()

orderRoute.post("/", ValidationMiddleware(createOrderSchema), orderController.createOrder)
.get("/", orderController.getAllOrders)

export default orderRoute