const passport = require("passport");
const {Strategy} = require("passport-local");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express= require("express");
const loginRouter = express.Router();
const {User} = require("../models/mongodbconfig");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWTSECRET;

passport.use(new Strategy({usernameField:"email"},async(email,password,done)=>{
    try{
   
        const findUser = await User.findOne({email:email})

        if(!findUser){
             return done(null, false, { message: "User not found" });
        }
        const hash = findUser.password;
        const match = await bcrypt.compare(password, hash);
        if(!match){
            return done(null, false, { message: "Wrong password" });
        }
       
       return done(null, findUser);
       
    }catch(err){
       return done(err, null);
    }
}));
loginRouter.post("/",(req,res,next)=>{
    try{ 
        passport.authenticate("local", { session: false }, (err, user, info) => {
            if (err || !user) {
                return res.status(401).json({ message: info?.message || "Login failed" });
            }
            const token = jwt.sign({userId:user._id,userEmail:user.email},jwtSecret);
            res.status(201).json({
                message: "Login successful",
                token,
                user: {
                    id: user._id,
                    email: user.email
                }
            });
        })(req, res, next);
    }catch(err){
        next(err);
    }
          
});
module.exports = loginRouter;