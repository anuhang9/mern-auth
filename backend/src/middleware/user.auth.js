import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next)=>{
    try{
        const { token } = req.cookies;
    
        if(!token){
            return res.json({success: false, message: "Not authorized."})
        }
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDecode.id){
            req.body.userId = tokenDecode.id
        }
        else{
            return res.json({success: false, message: "Not authorized."})
        }
        next()
    }catch(err){
        return res.json({success: false, message: err.message})
    }
}