import Joi from "joi";

export const registerSchema = Joi.object({
  name: Joi.string().max(20).min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string()
  .min(9)
  .max(9)
  .pattern(
    
     /^(9[012345789]|6[125679]|7[0123456789]| 3[3] | 8[8]| 2[0]| | 5[05])[0-9]{7}$/
  )
  .required()
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
}).required()

export const updateSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email(),
  password: Joi.string().min(5).max(15),
  phoneNumber: Joi.string().min(9).max(9)
  .pattern( /^(9[012345789]|6[125679]|7[0123456789]|3[3]|8[8]|2[0]|5[05])[0-9]{7}$/ )
})

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
}).required();