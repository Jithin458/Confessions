const express = require("express");
const mongoose = require("mongoose");
const hostRouter = express.Router();
const {Host,User}= require("../models/mongodbconfig.js")


hostRouter.get("/get-confessions",async(req,res)=>{
    const hostName = req.body.name;
    const exist = await Host.findOne({host:hostName})
    if(!exist){
        res.status(404).json({ msg: "Host doesnt exist" });
    }else{
      const confessions = await User.find({host:hostName}).select("confession")
      res.json({confessions})
    }
    

})
hostRouter.post("/post-host",async(req,res)=>{
    const hostName = req.body.name;
    const exist = await Host.findOne({host:hostName})
    if(exist){
        res.status(404).json({ msg: "Host already exists" });
    }else{
      const host = new Host({
        host:hostName
      });
      await host.save();
      res.status(201).json({ msg: "Created" });
    }
    


})
module.exports = hostRouter;