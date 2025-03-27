import { Router } from "express";
import foodController from "../controller/food.controller.js";



const foodRouter = Router()

foodRouter.get("/", foodController.getAllfood)
.post("/", foodController.createFood)
.get("/:id", foodController.getOneFood)
.patch("/:id", foodController.updateFood)
.delete("/:id", foodController.deleteFood)

export default foodRouter