import { isValidObjectId } from "mongoose"
import categoryModel from "../models/category.model.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import foodsModel from "../models/foods.model.js"


const getAllcategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find().populate("foods")

    res.status(200).send({
      message: "success",
      data: category
    });
  } catch (error) {
    next(error)
  }
}

const getById = async (req,res, next) => {
  try {
    const id = req.params.id

    if(!isValidObjectId(id)){
      throw new ErrorHandler(400, `Given ID: ${id} is not valid object ID`);
    }

    const category = await categoryModel.findById(id);

    if(!category){
      throw new ErrorHandler(404, `ID ${id} Not Found`);
    }

    res.status(200).send({
      message:"success",
      data: category
    });

  } catch (error) {
    next(error)
  }
}

const createCategory = async (req, res, next) => {
  try {
    const { name, foods } = req.body;

    const foundedCategory = await categoryModel.findOne({ name });

    if (foundedCategory) {
      return res.status(409).send({ message: `Category "${name}" already exists` });
    }


    const formattedFoods = Array.isArray(foods) ? foods : [foods];

    const data = await categoryModel.create({ name, foods: formattedFoods });

    res.status(201).send({
      message: "success",
      data: data,
    });

  } catch (error) {
    next(error);
  }
};


const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    const { name, foods } = req.body

    if(!isValidObjectId(id)){
      throw new ErrorHandler(400, `Given ID: ${id} is not valid object ID`);
    }

    const foundedCategory = await categoryModel.findOne({ name });


    if(foundedCategory){
      throw new ErrorHandler(409, `name ${name} allaqa mavjud`);
    }

    if(foods){
      if(!isValidObjectId(foods)){
        throw new ErrorHandler(400, `Foods ID ${foods} Error Format`)
      }
    }

    if(foods){
      const foodId = await foodsModel.findById(foods)

      if(!foodId){
        throw new ErrorHandler(404, `Bunday Food ID ${foods} mavjud emas`)
      }
    }

    const updateCategoryId = await categoryModel.findByIdAndUpdate(id, {name, foods}, {new: true});

    res.status(200).send({
      message:"success",
      data: updateCategoryId
    });
  } catch (error) {
    next(error)
  }
}

const deleteCategory = async (req,res, next) => {

  try {
    const id = req.params.id

    if(!isValidObjectId(id)){
      throw new ErrorHandler(400, `Given ID: ${id} is not valid object ID`);
    }

    const category = await categoryModel.findByIdAndDelete(id);

    if(!category){
      throw new ErrorHandler(404, `ID ${id} Not Found`);
    }

   res.status(204).send()
  } catch (error) {
    next(error)
  }
}


export default { getAllcategory, createCategory, getById, updateCategory, deleteCategory };