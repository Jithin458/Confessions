const express = require("express");
const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
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
     createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})

const Conf = mongoose.model("confessions",confSchema)
const User = mongoose.model("users",userSchema)

module.exports= {Conf,User};