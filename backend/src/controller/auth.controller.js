import bcrypt from 'bcryptjs'
import { userModel } from '../models/user.model';

export const regester = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: "Required all fields." });
    };
    const existEmail = userModel.findOne({email});
    if(existEmail){
        return res.json({success:false, message: "Email already exist."})
    };
    const hashPassword = await bcrypt.hash(password, 10);
    const user = new userModel({name, email, hashPassword});
    await user.save();
  } catch (err) {
    res.json({ success: false, message: "Regester controller error." });
  }
};
