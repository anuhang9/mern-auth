import { Button } from "../components/button";
import { Input } from "../components/input-text";
import regImg from '../assets/reg-dec.png'
import { Facebook, Github } from "lucide-react";

export const Registration = () => {
  return (
   <div className='flex items-center justify-center bg-white p-5 m-2  shadow-xl rounded-md'>
      <div className="pl-5">
        <h3 className='py-1 text-3xl font-semibold'>Sign Up</h3>
        <form className='flex flex-col gap-3'>
            <Input inputType={"text"} inputPlaceholder={"Your Name"} inputName={"name"}/>
            <Input inputType={"text"} inputPlaceholder={"Your Email"} inputName={"email"}/>
            <Input inputType={"password"} inputPlaceholder={"Password"} inputName={"password"}/>
            <div className='flex gap-2'>
            <input type='checkbox' className='border cursor-pointer' name='rememberme'/>
            <label htmlFor="rememberme">I agree terms and conditons of service.</label>
            </div>
            <Button buttonName={"Register"} buttonType={'submit'}/>
        </form>
        <div className='flex gap-2 justify-center items-center py-5'>
            <span>or login with</span>
            <button className='bg-blue-900 px- rounded-md text-white cursor-pointer p-2'><Facebook/></button>
            <button className='bg-gray-800 px- rounded-md text-white cursor-pointer p-2'><Github/></button>
            <button className='bg-red-400 px- rounded-md text-white cursor-pointer py-2 px-3 font-bold'>G</button>
        </div>
      </div>
      <div className='flex flex-col items-center'>
        <img className='size-80' src={regImg} alt="" />
        <p>Register?</p>
      </div>
    </div> 
  );
};
