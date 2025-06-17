const jwt = require("jsonwebtoken");

const verify = ()=>{
const token = req.headers.authorization?.split(" ")[1]
if(!token){
    res.status(401).json({msg:"No token provided"})
}
try{

}catch(err){
    console.log(err);
    res.status().json(err)
}
const decoded = jwt.verify(token,"secret");
req.hostEmail = decoded.email;

}