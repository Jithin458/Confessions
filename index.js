const express = require("express");
const mongoose = require("mongoose");
const hostRouter = require("./routes/host");
const userRouter = require("./routes/users");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
require ('dotenv').config;

const app = express();
const port = process.env.PORT || 3000;
const connectUrl = process.env.CONNECTURL;
const logStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'});

app.use(helmet());
app.use(morgan(':method :url :date[web]',{stream:logStream}));
app.use(express.json());
app.use("/host",hostRouter);
app.use("/user",userRouter);

const connectDb = async()=>{
    try{
    mongoose.connect("connect-url", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
}
catch(err){
    console.log(err);
}}
connectDb();


app.listen(port,()=>{
    console.log("server is running...")
})