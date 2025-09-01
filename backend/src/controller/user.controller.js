import { userModel } from "../models/user.model";

export const getUserData = async(req, res)=>{
    try{
        const { userId } = req.body;
        const user = await userModel.findById({userId});
        if(!user){
            return res.json({success:false, message: "User not found."})
        }
        res.json({success: true, useDate:{name: user.name, isAccountVeirified: user.isAccountVeirified}})
    }catch(err){
      return res.json({success:false, message: err.message})
    }
}