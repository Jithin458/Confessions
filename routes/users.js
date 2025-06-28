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


userRouter.post("/post-confession",async(req,res,next)=>{
  try{
    const hostEmail = req.body.email;
    const exist = await Host.findOne({host:hostEmail})
    if(!exist){
      const err = new Error("Host doesnt exist");
      err.statusCode = 404;
      err.status = fail;
      next(err);
    }if(exist.isHosted == true){
      const confession = req.body.confession;
      const user = new Conf({
        host:hostEmail,
        confession:confession,
        expiresAt:exist.createdAt
      });
      await user.save();
      res.status(201).json({ msg: "Created" });
    }else{
      const err = new Error("Confession doesnt exists");
      err.statusCode = 404;
      err.status = fail;
      next(err);
     
    }
  }catch(err){
    next(err);
  }

})

module.exports = userRouter;