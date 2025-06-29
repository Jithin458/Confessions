const express = require("express");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    email:String,
    password:String,



})
const hostSchema = new mongoose.Schema({
    host:String,
    jwt:String,
    isHosted:Boolean,
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})
const confSchema = new mongoose.Schema({
    host:String,
    confession:String,
    expiresAt:Date
  
})
confSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const Conf = mongoose.model("confessions",confSchema)
const User = mongoose.model("users",userSchema)
const Host = mongoose.model("host",userSchema)
module.exports= {Conf,User,Host};