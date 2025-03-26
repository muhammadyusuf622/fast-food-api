import { isValidObjectId } from "mongoose"
import categoryModel from "../models/category.model.js"
import ErrorHandler from "../utils/ErrorHandler.js"
import {isValidObjectId} from "mongoose"


const getAllcategory = async (req, res, next) => {
  try {
    const category = await categoryModel.find()

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

const createCategory = async (req,res, next) => {
  try {
    const {name} = req.body

    const foundedCategory = await categoryModel.findOne({ name });

    if(foundedCategory){
      throw new ErrorHandler(404, `Category ${name} allaqachon ishlatilgan`)
    }

    const data = await categoryModel.create({ name });

    res.status(200).send({
      message: "success",
      data: data
    })
  } catch (error) {
    next(error)
  }
}

const updateCategory = async (req, res, next) => {
  try {
    const id = req.params.id
    const { name } = req.body

    if(!isValidObjectId(id)){
      throw new ErrorHandler(400, `Given ID: ${id} is not valid object ID`);
    }

    const foundedCategory = await categoryModel.findOne({ name });


    if(foundedCategory){
      throw new ErrorHandler(409, `name ${name} allaqa mavjud`);
    }

    const updateCategoryId = await categoryModel.findByIdAndUpdate(id, {name});

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