import { compare, hash } from "bcrypt";
import userModel from "../models/user.model.js"
import ErrorHandler from "../utils/ErrorHandler.js";
import { isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import { ACCSESS_TOKEN_EXPITR_TIME, ACCSESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPITR_TIME, REFRESH_TOKEN_SECRET_KEY } from "../config/jwt.config.js";

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

    const accsessToken = jwt.sign({id: user.id, role: user.role }, ACCSESS_TOKEN_SECRET_KEY, { 
      expiresIn: ACCSESS_TOKEN_EXPITR_TIME, 
      algorithm: "HS256"
    });

    const refreshToken = jwt.sign({id: user.id, role: user.role }, REFRESH_TOKEN_SECRET_KEY, { 
      expiresIn: REFRESH_TOKEN_EXPITR_TIME, 
      algorithm: "HS256"
    });

    res.status(201).send({
      message: "User registered successfully",
      tokens: {
        accsessToken,
        refreshToken
      },
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


const refresh = async (req, res, next) => {
  try {
  
    const {refreshToken} = req.body;

    const data = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET_KEY);


  } catch (error) {
    if(error instanceof jwt.TokenExpiredError){
      next(new ErrorHandler(422, "Refresh token expired"))
    } else if(error instanceof jwt.JsonWebTokenError) {
      next(new ErrorHandler(400, "Invalid refresh token"))
    } else {
      next(error)
    }
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