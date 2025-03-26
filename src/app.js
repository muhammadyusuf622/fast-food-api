import express from "express"
import errorMiddleware from "./middleWare/errorMiddleware.js";
import router from "./route/index.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use("/api",router)

app.all("/*", (req,res) => {
  res.status(404).send({
    message: `Given ${req.url} with method: ${req.method} not found`,
  });
});

app.use(errorMiddleware);

export default app;