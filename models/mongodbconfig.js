const express = require("express");
const mongoose = require("mongoose");


const hostSchema = new mongoose.Schema({
    host:String,
    jwt:String,
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})
const userSchema = new mongoose.Schema({
    host:String,
    jwt:String,
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})
const confSchema = new mongoose.Schema({
    host:String,
    confession:String,
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})
const Host = mongoose.model("hosts",hostSchema)
const Conf = mongoose.model("users",confSchema)
const User = mongoose.model("users",userSchema)

module.exports= {Host,Conf,User};