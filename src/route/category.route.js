import { Router } from "express";
import categoryController from "../controller/category.controller.js";

const categoryRouter = Router()

categoryRouter.get("/", categoryController.getAllcategory)
.post("/",categoryController.createCategory)
.get("/:id", categoryController.getById)
.put("/:id", categoryController.updateCategory)
.delete("/:id", categoryController.deleteCategory)

export default categoryRouter;