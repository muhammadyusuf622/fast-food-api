import Joi from "joi";


export const createFoodSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string(),
  price: Joi.number().positive().required(),
  imageUrl: Joi.string(),
  category: Joi.string().required(),
}) .required();