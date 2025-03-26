import { Router } from "express";
import categoryController from "../controller/category.controller.js";
import { ValidationMiddleware } from "../middleware/validation.middleware.js";
import { createCategorySchema, updateCategorySchema } from "../schema/category.schema.js";

const categoryRouter = Router()

categoryRouter.get("/", categoryController.getAllcategory)
.post("/", ValidationMiddleware(createCategorySchema),categoryController.createCategory)
.get("/:id", ValidationMiddleware(updateCategorySchema), categoryController.getById)
.put("/:id", categoryController.updateCategory)
.delete("/:id", categoryController.deleteCategory)

export default categoryRouter;