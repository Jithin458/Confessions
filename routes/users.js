const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const {User,Conf,Host}= require("../models/mongodbconfig.js")
const rateLimit = require("express-rate-limit");


const userLimiter = rateLimit({
  windowMs:10*60*1000,
  limit:13
})
userRouter.use(userLimiter);


userRouter.post("/post-confession",async(req,res)=>{
    const hostEmail = req.body.email;
    const exist = await Host.findOne({host:hostEmail})
    if(!exist){
       return res.status(404).json({ msg: "Host doesnt exist" });
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
      res.status(404).json({ msg: "confession doesnt exist" });
    }
    

})

module.exports = userRouter;