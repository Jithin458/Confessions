const jwt = require("jsonwebtoken");

const verifyToken = (req,res,next)=>{
const token = req.headers.authorization?.split(" ")[1]
if(!token){
    res.status(401).json({msg:"No token provided"})
}
try{
const decoded = jwt.verify(token,"secret");
req.hostEmail = decoded.email;
next()
}catch(err){
    console.log(err);
    res.status(403).json(err)
}}

module.exports = verifyToken();