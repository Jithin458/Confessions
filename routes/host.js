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



hostRouter.get("/get-confessions",verifyToken,async(req,res,next)=>{
  try {
    const hostEmail = req.hostEmail;
    const user = await Host.findOne({email:hostEmail})
    const isHosted = user.isHosted;
    if(isHosted!=true){
      const err = new Error("Confession doesnt exist");
      err.statusCode = 404;
      err.status = fail;
      next(err);
    }else{
      const confessions = await Conf.find({email:hostEmail}).select("confession")
      res.json({confessions})
    }
  }catch(err){
    next(err);
  }
  });

hostRouter.post("/init",verifyToken,async(req,res,next)=>{
  try {
    const hostEmail = req.hostEmail;
    const host = await Host.findOne({email:hostEmail})
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