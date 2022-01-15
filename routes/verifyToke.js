const jwt = require('jsonwebtoken')

const verifyToken=(req,res,next)=>{
    const authHeader= req.headers.token
    if(authHeader){
        const token = authHeader
        jwt.verify(token,process.env.JWT_SEC,(err,user)=>{
            if(err) res.status(403).json("token is not right")
            req.user = user
            next()
        })
    } else{
        return res.status(401)
    .json("You are not Authorized")
}
}
const verifyTokenAndAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
        next()
        } else{
            res.status(403).json("You are not")
        }
    })
}
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user.isAdmin) {
        next();
      } else {
        res.status(403).json("You are not alowed to do that!");
      }
    });
  };
// module.exports={verifyToken,verifyTokenAndAuth,verifyTokenAndAdmin} 