const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const {Host,User}= require("../models/mongodbconfig.js")



userRouter.post("/post-confession",async(req,res)=>{
    const hostName = req.body.name;
    const exist = Host.findOne({host:hostName})
    if(!exist){
        res.status(404).json({ msg: "Host doesnt exist" });
    }else{
      const confession = req.body.confession;
      const user = new User({
        host:hostName,
        confession:confession
      });
      await user.save();
      res.status(201).json({ msg: "Created" });
    }
    

})

module.exports = userRouter;