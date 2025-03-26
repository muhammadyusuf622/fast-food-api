import foodsModel from "../models/foods.model.js";



const getAllfood = async (req, res, next) => {
  try {
    
    const product = await foodsModel.find().populate("category");

    res.send({
      message: "success",
      count: product.length,
      data: product
    });
  } catch (error) {
    next(error)
  }
}

const createFood = async (req, res, next) => {
  try {
    
    const {name, price, category, description, imageUrl} = req.body;

    const food = await foodsModel.create({
      name,
      price,
      category,
      description,
      imageUrl,
    });

    res.status(201).send({
      message: "success",
      data :food
    })
  } catch (error) {
    next(error)
  }
}

export default { getAllfood, createFood };