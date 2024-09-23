
import googleImg from "../assets/google.png"
// const buttonData = [
//     {
//         type:"signup",
//         text: "Sign-Up",
//     },
//     {
//         type:"signin",
//         text: "Sign-In"
//     }
// ]

 const SignupButton = () => {
  return (
    <div className="bg-neutral-300 py-2 px-4  rounded-md  text-lg font-medium text-neutral-600 hover:bg-neutral-400 hover:text-neutral-700 transition duration-200 border-[1px] border-neutral-400 w-full" >
        Sign Up
    </div>
  )
}
 const SigninButton = () => {
  return (
    <div className="bg-neutral-300 py-2 px-4  rounded-md w-full text-lg font-medium text-neutral-600 hover:bg-neutral-400 transition duration-200 border-[1px] border-neutral-400 hover:text-neutral-700">
        Sign In
    </div>
  )
}


const GoogleButton = () => {
  return (
    <div className="py-2 px-4 flex items-center justify-center gap-4 rounded-md w-full bg-neutral-300  text-lg text-neutral-600 hover:bg-neutral-400 transition duration-200 border-[1px] font-medium border-neutral-400 hover:text-neutral-700">
    Signup with google
    <img src={googleImg} alt="googleImg" height={25} width={25}/>
    </div>

  )
}

export { GoogleButton, SigninButton, SignupButton }
