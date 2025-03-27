import express from "express";
import router from "./route/index.js";
import Joi from "joi";
import errorMiddleware from "./middleWare/errorMiddleware.js";

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use((req, res, next) => {
  console.log(req.url, req.method)
  next()
});

// app.use((req, res, next) => {

//   if(req.method === "POST"){
//     const {body} = req;

//     const categorySchema = Joi.object({
//       name : Joi.string().min(4).max(8).required()
//     });

//     const {error, value} = categorySchema.validate(body)

//     if(error){
//       return res.status(400).send({
//         message: error.message
//       });
//     }

//     console.log(value)
//   }
//   next()
// })

app.use("/api",router)

app.all("/*", (req,res) => {
  res.status(404).send({
    message: `Given ${req.url} with method: ${req.method} not found`,
  });
});

app.use(errorMiddleware);

export default app;