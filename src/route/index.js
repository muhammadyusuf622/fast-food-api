import { Router } from "express";
import categoryRouter from "./category.route.js";
import productRouter from "./product.route.js";


const router = Router()

router.use("/categories", categoryRouter)
router.use("/products", productRouter)

export default router;