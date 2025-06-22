const express = require("express");
const mongoose = require("mongoose");
const hostRouter = require("./routes/host");
const userRouter = require("./routes/users");
const helmet = require("helmet");

const app = express();

app.use(helmet());
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