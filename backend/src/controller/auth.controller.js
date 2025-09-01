import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import { transporter } from "../lib/nodemailer.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Required all fields." });
    }
    const existEmail = userModel.findOne({ email });
    if (existEmail) {
      return res.json({ success: false, message: "Email already exist." });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({ name, email, hashPassword });
    await user.save();
    //jwt
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 12,
    });
    res.json({success: true, message: "Account has been created."})
  } catch (err) {
    res.json({ success: false, message: "Regester controller error." });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({ success: false, message: "Enter your credentials." });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Invalid credentials." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials." });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.cookie("authT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 12,
    });
    res.json({success: true, message: "Log in successfull."})
  } catch (err) {
    res.json({ success: false, message: "Regester controller error." });
  }
};

export const logOut =async(req, res)=>{
  try{
    req.clearCookie('authT', {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 12,
    })
    return res.json({success: true, message: "Logout successfull."})
  }catch(err){
    res.json({success: false, message: err.message})
  }
}

export const sendVerifyOtp = async(req, res)=>{
  try{
    const { userId } = req. body;

    const user = await userModel.findById({userId})

    if(user.isAccountVerified){
      return res.json({success: false, message: "You are already verified."})
    }
    const otp = Math.floor(100000 + Math.random()* 900000);
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 1000 * 60 * 60 * 3;
    await user.save();

    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "verify your email",
      text: `otp code is ${otp}`
    }
    await transporter.sendMail(mailOption);
    res.json({success: true, message: "Verification top sent in your email."})
  }catch(err){
    res.json({success: false, message: err.message})
  }
}

export const verifyEmail = async(req, res)=>{
  try{
    const { userId, otp } = req.body;
    if(!userId || !otp){
      return res.json({success: false, message: "Invalid details."})
    }
    const user = await userModel.findById(userId)
    if(!user){
      return res.json({success: false, message: "User not found."})
    }
    if(user.verifyOtp === "" || user.verifyOtp !== otp){
      return res.json({success: false, message: "Invalid Otp."})
    }
    if(user.verifyOtpExpireAt < Date.now()){
      return res.json({success: false, message: "Otp expired."})
    }
    user.isAccountVerified = true;
    user.verifyOtp = '';
    user.verifyOtpExpireAt = 0;
    await user.save();
    return res.json({success : true, message: "Email verified Succssful."})
  }catch(err){
    return res.json({success: false, message: err.message})
  }
}

export const isAuthenticated = async (req, res)=>{
  try{
    return res.json({success: true})
  }catch(err){
    return res.json({success: false, message: err.message})
  }
}

export const sendResetOtp = async (req, res)=>{
  try{
    const { email } = req.body;
    if(!email){
      return res.json({success: false, message: "Enter your email."})
    }
    const user = await userModel.findOne({email});
    if(!user){
      return res.json({success: false, message: "User not found"})
    }
    const otp = Math.floor(100000 + Math.random()* 900000);
    user.resetOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 1000 * 60 * 60 * 3;
    await user.save()
    const mailOption = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "reset password",
      text: `otp code is ${otp}`
    }
    await transporter.sendMail(mailOption);
    res.json({success: true, message: "Verification top sent in your email."})
  }catch(err){
    return res.json({success: false, message: err.message})
  }
}

export const resetPassword = async (req, res)=>{
  try{
    const {email, otp, newPassword} = req.body;
    if(!email || !otp || !newPassword){
      return res.json({success: false, message: "Enter Required fields."})
    }
    const user = await userModel.findOne({email});
    if(!email){
      return res.json({success: false, message: "User not found."})
    }
    if(user.resetOtp === "" || user.resetOtp !== otp){
      return res.json({success:false, message: "Invalid Otp."})
    }
    if(user.resetOtpExpireAt < Date.now()){

      return res.json({success:false, message: "Otp Expired."})
    }
    const hasResetPassword = bcrypt.hash(newPassword, 10);
    user.password = hasResetPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();
    return res.json({success:true, message: "Password has been reset."})
  }catch(err){
    return res.json({success: false, message: err.message})
  }
}