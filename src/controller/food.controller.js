import { isValidObjectId } from "mongoose";
import foodsModel from "../models/foods.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import categoryModel from "../models/category.model.js";



const getAllfood = async (req, res, next) => {
  try {
    
    const food = await foodsModel
    .find()
    .populate("category", "-createdAt -updatedAt -foods")
    .select("-createdAt -updatedAt");

    res.send({
      message: "success",
      count: food.length,
      data: food
    });
  } catch (error) {
    next(error)
  }
}

const createFood = async (req, res, next) => {
  try {
    
    const {name, price, category, description, imageUrl} = req.body;

    const checkCategory = await categoryModel.findById(category);

    if(!checkCategory){
       throw new ErrorHandler(400, "Category not found")
    }
    const food = await foodsModel.create({
      name,
      price,
      category,
      description,
      imageUrl,
    });

    await foodsModel.updateOne(
      {_id: category},
      {
        $push: {
          foods: food._id,
        },
      }
    );

    res.status(201).send({
      message: "success",
      data :food
    })
  } catch (error) {
    next(error)
  }
}

const getOneFood = async (req, res) => {
  const { id } = req.params;

  if(!isValidObjectId(id)){
    throw new ErrorHandler(400, `Given ID: ${id} is not Object ID`)
  }

  const food = await foodsModel.findById(id).populate("Category");

  res.send({
    message: "success",
    data: food
  });
};

const updateFood = async (req, res, next) => {
  try {
    const id = req.params.id
    const {name, description, price} = req.body

    if(!isValidObjectId(id)){
      throw new ErrorHandler(400, `Given ID: ${id} is not Object ID`)
    }

    const food = await foodsModel.findByIdAndUpdate(id, {
      name,
      description,
      price,
    }, {
      new: true,
    });

    res.status(201).send({
      message: "success",
      data: food
    })
  
  } catch (error) {
    next(error)
  }
}

const deleteFood = async (req, res, next ) => {
  try {
    
    const { id } = req.params;

    if(!isValidObjectId(id)){
      throw new ErrorHandler(400, `Given ID: ${id} is not Object ID`)
    }
  
    await foodsModel.deleteOne( { _id: id} );

    res.status(204).send()

  } catch (error) {
    next(error)
  }
}

export default { getAllfood, createFood, deleteFood, updateFood, getOneFood };