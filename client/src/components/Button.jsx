
/* eslint-disable react/prop-types */
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import googleImg from "../assets/google.png";
import logo from "../assets/morning-bug.png";

const CommonButton = ({props}) => {
  <div className=" bg-light-600 hover:bg-light-700 text-white dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-500 duration-200 transition py-2 px-4  rounded-md  text-md font-medium " >
        {props}
    </div>
}

 const SignupButton = () => {
  return (
    <div className="bg-[#d1dff0] py-2 px-4  rounded-md  text-lg font-medium      w-full" >
        Sign Up
    </div>
  )
}
 const SigninButton = () => {
  return (
    <div className="bg-[#d1dff0] py-2 px-4  rounded-md w-full text-lg font-medium   ">
        Sign In
    </div>
  )
}


const GoogleButton = () => {
  return (
    <div className=" py-2 px-4 flex items-center justify-center gap-4 rounded-md w-full bg-[#d1dff0]  text-lg   font-medium ">
    Signup with google
    <img src={googleImg} alt="googleImg" height={25} width={25}/>
    </div>

  )
}
const Logo = () => {
 return (
  <Link to="/">
    <div className=" flex items-center gap-4 justify-center">
              <img src={logo} className="w-16"/>
              <span className="font-bold text-2xl text-left dark:text-[#8f9195] text-[#18222cc4]">Morning<br/>Bugs</span>
    </div>
  </Link>
 )
}

const HeaderLogo = () => {
  return (    
    <div className="flex items-center gap-3 justify-between">
              <img src={logo} className="w-[28px] md:w-12 "/>
              <span className="font-bold text-sm leading-4 md:text-lg text-left dark:text-[#8f9195] md:leading-5">Morning<br/>Bugs</span>
    </div>
  
  )
}

const HeaderButton = (props) => {
  return (
      <Button className="bg-neutral-300 rounded-md text-lg font-bold text-neutral-600 hover:bg-neutral-400 transition duration-200 border-[1px] border-neutral-400 hover:text-neutral-700">{props.children}</Button> 
  )
}
export { CommonButton, GoogleButton, HeaderButton, HeaderLogo, Logo, SigninButton, SignupButton };

