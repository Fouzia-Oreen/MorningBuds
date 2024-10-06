

import { TextInput } from "flowbite-react";
import { useSelector } from 'react-redux';
//import {CommonButton} from "./Button"

const DashProfile = () => {
    const {currentUser} = useSelector(state => state.user)
  return (
    <section className='h-screen mx-auto  flex  items-center justify-center  bg-slate-300 dark:bg-dark-200 '>
      <div className='py-6 w-full md:w-[70%] md:h-[80%] flex flex-col items-center gap-4 bg-light-500 dark:bg-dark-300 rounded-lg border-[1px] border-light-600 dark:border-dark-100'>
      <h1 className='font-bold text-3xl my-7 dark:text-dark-100'>Profile</h1>
      <form className='flex flex-col gap-12 w-full items-center'>
        <div className='w-32 h-32 self-center cursor-pointer shadow-lg rounded-full'>
        <img src={currentUser.profilePicture} alt="user" className='rounded-full w-full h-full border-8 object-cover border-light-600 dark:border-dark-200' />
        </div>

        <div className='flex flex-col items-center gap-6 my-4 w-full  md:w-[500px] '>
        <TextInput type="text" id="username" placeholder="username" defaultValue={currentUser.username} class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50"/>
        <TextInput type="email" id="email" placeholder="email" defaultValue={currentUser.email}  class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50"/>
        <TextInput type="password" id="password" placeholder="password"  class="w-full rounded-md dark:bg-dark-200 bg-light-100 border-light-700 dark:border-dark-50"/>
        <button className=" bg-light-600 hover:bg-light-700 text-white dark:bg-dark-100 hover:dark:bg-dark-200 dark:text-dark-500 duration-200 transition py-2 px-4  rounded-md  text-md font-medium ">Update</button>
        {/* <CommonButton>{Update}</CommonButton> */}
        </div>
      </form>
      <div className="flex items-center justify-between gap-12 font-semibold">
        <span className="cursor-pointer text-red-700">Delete Account</span>
        <span className="cursor-pointer">Sign Out</span>
      </div>
    </div> 
    </section>
  )
}

export default DashProfile
// 6096BA