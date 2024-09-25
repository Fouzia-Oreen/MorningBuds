import { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa"
import { Menu, X } from "lucide-react";
import { Link, NavLink } from 'react-router-dom';
import { HeaderButton } from './Button';

const NavLinks = () => {
    const Links = [
      {name:"Home", link:"/"},
      {name:"About", link:"/about"},
      {name:"Service", link:"/service"},
      {name:"Contact", link:"/contact"},
    ]
  return (
    <div className='flex-col lg:flex-row flex gap-4  items-center '>
    <ul className='flex flex-col lg:flex-row lg:mr-8'>
        {Links.map((link) => 
        <li key={link.name} className="py-4 lg:py-0 px-3">
          <NavLink 
          to={link.link} 
          className=" decoration-none text-neutral-600 font-semibold text-2xl lg:text-sm">{link.name}</NavLink> 
        </li>
        )}
    </ul>

    <div className="flex lg:gap-8 items-center flex-col gap-2 lg:flex-row">
    <form className="relative lg:flex items-center justify-between mt-4 lg:mt-0">
        <input type="text" className='py-[4px] px-2 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600 focus:border-none focus:outline-none' id="email" placeholder="Search ..."/> 
        <button className="absolute right-2 top-2"><AiOutlineSearch className="text-neutral-500 font-bold"/>
        </button>         
    </form>   
    <div className="flex gap-3 my-4 lg:my-0">
    <Link to="sign-in"><HeaderButton>Sign In</HeaderButton>
    </Link>
    <Link to="sign-up"><HeaderButton>Sign Up</HeaderButton>
    </Link>
    </div>
    <button className="hidden lg:block  w-6 h-6 text-neutral-600 rounded-full bg-neutral-100 items-center p-1" >
        <FaMoon />
    </button>
    </div>
    </div>
  )
}


const Nav = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
      setIsOpen(!isOpen);
    }
  return (
    <>
    <nav className="flex  items-center justify-between overflow-hidden ">
    <div className="hidden justify-end lg:flex w-full md:hidden">
      <NavLinks />
    </div>
    {/* <div className="w-[75px]">
      <ThemeToggle />
    </div> */}
    <div className="flex w-[75px] justify-end lg:hidden">
      <button className='text-neutral-600' onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}</button>
    </div>
  </nav>
  {isOpen && (<div className='flex flex-col items-center basis-full py-4'
  ><NavLinks /></div>)}
  </>
  )
}

export default Nav