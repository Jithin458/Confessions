const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const express = require("express");
const signupRouter = express.Router();
const {User} = require("../models/mongodbconfig");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWTSECRET;

signupRouter.post("/",async(req,res,next)=>{
    try{
        const {email,password} = req.body;
        const exist = await User.findOne({email:email});
        if(exist){
             const err = new Error("User already exists");
             err.statusCode = 409;
             err.status = "fail";
             next(err);
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({
            email:email,
            password:hashedPassword
        });
        await user.save();
        const token = jwt.sign({userId:user._id,userEmail:user.email},jwtSecret)
         res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        email: user.email
      }
    });
    }catch(err){
        next(err);
    }
})
module.exports = signupRouter;