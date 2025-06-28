const express = require("express");
const mongoose = require("mongoose");
const hostRouter = express.Router();
const {Conf,User,Host}= require("../models/mongodbconfig.js")
const verifyToken = require("../middlewares/auth.js");
const rateLimit = require("express-rate-limit");
require('dotenv').config();

const jwtSecret = process.env.JWTSECRET;

const hostLimiter = rateLimit({
  windowMs:10*60*1000,
  limit:40
})
hostRouter.use(hostLimiter);

hostRouter.post("/new-user",async(req,res,next)=>{
  try{
 const email = req.body.email;
const exist = await User.findOne({host:email})
if(exist){
    const err = new Error("User already exists");
      err.statusCode = 409;
      err.status = fail;
      next(err);
  
}else{
  const payload = req.body;
const token = jwt.sign(payload,jwtSecret)

const user = new User({
  host:email,
  jwt:token,
  isHosted:false
})
await user.save();
res.json({token});
}
  }catch(err){
    next(err);
  }
});

hostRouter.get("/get-confessions",verifyToken,async(req,res,next)=>{
  try {
    const hostEmail = req.hostEmail;
    const user = await Host.findOne({host:hostEmail})
    const isHosted = user.isHosted;
    if(isHosted!=true){
      const err = new Error("Confession doesnt exist");
      err.statusCode = 404;
      err.status = fail;
      next(err);
    }else{
      const confessions = await Conf.find({host:hostEmail}).select("confession")
      res.json({confessions})
    }
  }catch(err){
    next(err);
  }
  });

hostRouter.post("/init",verifyToken,async(req,res,next)=>{
  try {
    const hostEmail = req.hostEmail;
    const host = await Host.findOne({host:hostEmail})
    const isHosted = host.isHosted;
    if(isHosted){
      const err = new Error("Confession already exists");
      err.statusCode = 409;
      err.status = fail;
      next(err);
    }else{
     host.isHosted = true;
      await host.save();
      res.status(201).json({ msg: "Created" });
    }
  }catch(err){
    next(err);
  }

})
module.exports = hostRouter;