const express = require("express");
const mongoose = require("mongoose");


const hostSchema = new mongoose.Schema({
    host:String,
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})
const userSchema = new mongoose.Schema({
    host:String,
    confession:String,
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})
const Host = mongoose.model("hosts",hostSchema)
const User = mongoose.model("users",userSchema)
module.exports= {Host,User};