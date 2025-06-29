const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const {Conf,Host}= require("../models/mongodbconfig.js")
const rateLimit = require("express-rate-limit");


const userLimiter = rateLimit({
  windowMs:10*60*1000,
  limit:13
})
userRouter.use(userLimiter);

userRouter.get("/user/:userId",async(req,res,next)=>{
  try{
    const userId = req.params.userId;
    const host= await Host.findOne({userId:userId})
    if(!host){
      const err = new Error("Host doesnt exist");
      err.statusCode = 404;
      err.status = "fail";
      next(err);
    }else{
      res.status(200).json({
        message:"host exist ",
        status:"success"

      })
    }
  }catch(err){
    next(err);
  }
})

userRouter.post("/post-confession/:userId",async(req,res,next)=>{
  try{
    const userId = req.params.userId;
    const host= await Host.findOne({userId:userId})
    if(!host){
      const err = new Error("Confession doesnt exist");
      err.statusCode = 404;
      err.status = "fail";
      next(err);
    }else{
      const confession = req.body.confession;
      const user = new Conf({
        userId:userId,
        confession:confession,
        expiresAt:exist.createdAt
      });
      await user.save();
      res.status(201).json({ msg: "Created" });
    }
  }catch(err){
    next(err);
  }

})

module.exports = userRouter;
