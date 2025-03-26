import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).required()
}).required();

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(30).alphanum().required()
}).required();
