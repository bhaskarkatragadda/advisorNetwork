const jwt=require('jsonwebtoken');
const Config=require('../config/config');

module.exports=function(req,res,next){
    const token = req.header("x-auth-token");
    if(!token)
    {
        return res.status(401).send("Access denied  no token provided");
    }
    try{
        const decoded = jwt.verify(token,Config.privateKey);
        req.userData = decoded;
        next();
    }
    catch(e)
    {
        return res.status(401).json({
            message:"Something went wrong"
        })
    }
}