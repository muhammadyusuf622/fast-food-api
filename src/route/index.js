import { Router } from "express";
import categoryRouter from "./category.route.js";
import foodRouter from "./food.route.js";
import userRouter from "./user.route.js";
import orderRoute from "./order.route.js";


const router = Router()

router.use("/categories", categoryRouter)
router.use("/foods", foodRouter);
router.use("/users", userRouter);
router.use("/orders", orderRoute);

export default router;