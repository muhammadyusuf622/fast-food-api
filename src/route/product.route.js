import { Router } from "express";
import productController from "../controller/product.controller.js";



const productRouter = Router()

productRouter.get("/", productController.getAllfood)
.post("/", productController.createFood)

export default productRouter