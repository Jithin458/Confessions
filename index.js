const express = require("express");
const mongoose = require("mongoose");
const hostRouter = require("./routes/host");
const userRouter = require("./routes/users")

const app = express();
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

app.use(express.json());

app.use("/host",hostRouter);
app.use("/user",userRouter);


app.listen(3000,()=>{
    console.log("server is running...")
})