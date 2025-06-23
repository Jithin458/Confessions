const express = require("express");
const mongoose = require("mongoose");
const hostRouter = require("./routes/host");
const userRouter = require("./routes/users");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

const app = express();
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


app.listen(3000,()=>{
    console.log("server is running...")
})