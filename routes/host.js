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

hostRouter.post("/new-user",async(req,res)=>{
 const email = req.body.email;
const exist = await User.findOne({host:email})
if(exist){
  return res.status(404).json({ msg: "User already exist" });
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

});

hostRouter.get("/get-confessions",verifyToken,async(req,res)=>{
    const hostEmail = req.hostEmail;
    const user = await Host.findOne({host:hostEmail})
    const isHosted = user.isHosted;
    if(isHosted!=true){
        return res.status(404).json({ msg: "confession doesnt exist" });
    }else{
      const confessions = await Conf.find({host:hostEmail}).select("confession")
      res.json({confessions})
    }});

hostRouter.post("/init",verifyToken,async(req,res)=>{
  try{
    const hostEmail = req.hostEmail;
    const host = await Host.findOne({host:hostEmail})
    const isHosted = host.isHosted;
    if(isHosted){
       return  res.status(404).json({ msg: "Confession already exists" });
    }else{
     host.isHosted = true;
      await host.save();
      res.status(201).json({ msg: "Created" });
    }}
    catch(err){
      console.log(err);
      res.json({err});
    }
    


})
module.exports = hostRouter;