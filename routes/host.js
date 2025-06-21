const express = require("express");
const mongoose = require("mongoose");
const hostRouter = express.Router();
const {Host,Conf,User}= require("../models/mongodbconfig.js")
const verifyToken = require("../middlewares/auth.js");
const rateLimit = require("express-rate-limit");
const jwtPassword ="";

const hostLimiter = rateLimit({
  windowMs:10*60*1000,
  limit:40
})
hostRouter.use(hostLimiter);

hostRouter.post("/new-user",async(req,res)=>{
 const email = req.body.email;
const exist = await Host.findOne({host:email})
if(exist){
  res.status(404).json({ msg: "User already exist" });
}else{
  const payload = req.body;
const token = jwt.sign(payload,jwtPassword)

const user = new User({
  host:email
})
await user.save();
res.json({token});
}

});

hostRouter.get("/get-confessions",verifyToken,async(req,res)=>{
    const hostEmail = req.hostEmail;
    const exist = await Host.findOne({host:hostEmail})
    if(!exist){
        res.status(404).json({ msg: "Host doesnt exist" });
    }else{
      const confessions = await Conf.find({host:hostEmail}).select("confession")
      res.json({confessions})
    }});

hostRouter.post("/init",verifyToken,async(req,res)=>{
    const hostEmail = req.hostEmail;
    const exist = await Host.findOne({host:hostEmail})
    if(exist){
        res.status(404).json({ msg: "Confession already exists" });
    }else{
      const host = new Host({
      host:hostEmail
      });
      await host.save();
      res.status(201).json({ msg: "Created" });
    }
    


})
module.exports = hostRouter;