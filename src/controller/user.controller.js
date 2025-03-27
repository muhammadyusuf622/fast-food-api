import { compare, hash } from "bcrypt";
import userModel from "../models/user.model.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";

const register = async (req, res, next) => {
  try {
    const { name, email, phoneNumber, password } = req.body;

    const foundedUser = await userModel.findOne({ 
      $or: [{ email }, { phoneNumber }] 
    });

    if (foundedUser) {
      throw new ErrorHandler(409, "User already exists, try another email or phone number")
    }

    const passwordHash = await hash(password, 10);

    const user = await userModel.create({ 
      name,
      email, 
      phoneNumber, 
      password: passwordHash
    });

    res.status(201).json({
      message: "User registered successfully",
      data: user
    });

  } catch (error) {
    next(error);
  }
};




const getAllUsers = async ( req, res, next) => {
  try {
    
    const users = await userModel.find();


    res.status(200).send({
      message: "success",
      data: users
    })
  } catch (error) {
    next(error)
  }
} 

const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id
    const {name, email, phoneNumber, imageUrl, password} = req.body

    if(!isValidObjectId){
      throw new ErrorHandler(400, `ID ${id} Error Format`)
    }

    const checkId = await userModel.findById(id)

    if(!checkId){
      throw new ErrorHandler(404, `ID ${id} Not Found`)
    }


    const newPassword = await hash(password, 10);

    console.log(newPassword)
    const data = await userModel.findByIdAndUpdate( id, {
      name,
      email,
      phoneNumber,
      imageUrl,
      password: newPassword
    } ,{new: true})

    res.status(200).send({
      message: "success",
      data: data
    });


  } catch (error) {
    next(error)
  }
}


const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
  
    if (!user) {
      return res.status(404).send({
        message: "User not found",
      });
    }
  
    const isMatch = await compare(password, user.password);

    console.log(isMatch)
  
    if (!isMatch) {
      throw new ErrorHandler(409, "Invalid password")
    }
  
    res.send({
      message: "success",
      data: user,
    });
  } catch (error) {
    next(error)
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const id = req.params.id

    if(!isValidObjectId(id)){
      throw new ErrorHandler(400, `ID ${id} Error Format`)
    }

    const checkId = await userModel.findById(id)

    if(!checkId){
      throw new ErrorHandler(404, `ID ${id} Not Found`)
    }

    await userModel.deleteOne( { _id: id});


    res.status(204).send()

  } catch (error) {
    next(error)
  }
}



export default {register, getAllUsers, login, deleteUser, updateUser}