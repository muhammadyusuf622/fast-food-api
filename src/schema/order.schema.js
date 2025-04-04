import Joi from "joi";

export const createOrderSchema = Joi.object({
  userId: Joi.string().required(),
  orderItem: Joi.array()
    .items(
      Joi.object({
        foodId: Joi.string().required(),
        quantity: Joi.number().positive().required(),
      })
    )
    .required(),
});
