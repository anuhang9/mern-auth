import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

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