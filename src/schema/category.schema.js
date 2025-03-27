import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  foods: Joi.string()
}).required();

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).alphanum().required(),
  foods: Joi.string()
}).required();
