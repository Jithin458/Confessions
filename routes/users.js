const express = require("express");
const mongoose = require("mongoose");
const userRouter = express.Router();
const {Host,Conf}= require("../models/mongodbconfig.js")



userRouter.post("/post-confession",async(req,res)=>{
    const hostEmail = req.body.email;
    const exist = Host.findOne({host:hostEmail})
    if(!exist){
        res.status(404).json({ msg: "Host doesnt exist" });
    }else{
      const confession = req.body.confession;
      const user = new Conf({
        host:hostEmail,
        confession:confession
      });
      await user.save();
      res.status(201).json({ msg: "Created" });
    }
    

})

module.exports = userRouter;