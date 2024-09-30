/* eslint-disable no-unused-vars */
import { Avatar, Dropdown, Navbar, NavbarToggle } from 'flowbite-react';
import { Menu, X } from "lucide-react";
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from 'react-router-dom';
import { toggleTheme } from '../app/theme/themeSlice';
import { HeaderButton } from './Button';

export const NavLinks = () => {
    const Links = [
      {name:"Home", link:"/"},
      {name:"About", link:"/about"},
      {name:"Service", link:"/service"},
      {name:"Contact", link:"/contact"},
    ]
    
    const location = useLocation();
    const path = useLocation().pathname;
    const dispatch = useDispatch()
    const {currentUser}  = useSelector((state )=> state.user)
    const {theme} = useSelector((state) => state.theme);

    // useEffect(() => {
    //   const urlParams = new URLSearchParams(location.search);
    //   const searchTermFromUrl = urlParams.get('searchTerm');
    //   if (searchTermFromUrl) {
    //     setSearchTerm(searchTermFromUrl);
    //   }
    // }, [location.search]);
   const handleSignOut ={}

  return (
    <Navbar className=''>
      <div className="flex lg:gap-8 items-center flex-col gap-2 lg:flex-row" >
    {/* nav links */}
    <ul className='flex flex-col lg:flex-row lg:mr-8 dark:text-neutral-200'>
        {Links.map((link) => 
        <li key={link.name} className="py-4 lg:py-0 px-3">
          <NavLink 
          to={link.link} 
          className=" decoration-none text-neutral-600 font-semibold text-2xl lg:text-sm">{link.name}</NavLink> 
        </li>
        )}
    </ul>

   
    {/* search */}
    <form className="relative lg:flex items-center justify-between mt-4 lg:mt-0">
        <input type="text" className='py-[4px] px-2 rounded-md w-full border-[1px] border-neutral-600 border-opacity-40 outline-none  focus:border-opacity-70 transition duration-200 text-neutral-600 focus:border-none  focus:outline-none' id="email" placeholder="Search ..."/> 
        <button className="absolute right-2 top-2"><AiOutlineSearch className="text-neutral-500 font-bold"/>
        </button>         
    </form>   

   <div>
    {currentUser ? ( 
      <Dropdown className='bg-neutral-400'
      arrowIcon={false}
      inline  
      label={ <Avatar alt='user' img={currentUser.profilePicture} rounded /> }
      > 
      <Dropdown.Header>
        <span className='block text-sm'>@{currentUser.username}</span>
        <span className='block text-sm font-medium tr'>{currentUser.email}</span>
      </Dropdown.Header>

      <Link to={'/dashboard?tab=profile'}>
       <Dropdown.Item>Profile</Dropdown.Item>
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
      </Dropdown>
       ) : (<Link to="/sign-in"><HeaderButton>Sign In</HeaderButton></Link>)
      }
    <Navbar.Toggle />
    </div>
    {/* theme button */}
    <button className="hidden lg:block  w-6 h-6 text-neutral-600 rounded-full bg-neutral-100 items-center p-1"  onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? <FaSun /> : <FaMoon />}
    </button>
    <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/projects'>Projects</Link>
        </Navbar.Link>
        <Link to="/sign-up"><HeaderButton>Sign Up</HeaderButton>
        </Link>
      </Navbar.Collapse>
    
    </div>
    </Navbar>
  )
}






// const Nav = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const toggleNavbar = () => {
//       setIsOpen(!isOpen);
//     }
//   return (
//     <>
//     <nav className="flex  items-center justify-between overflow-hidden ">
//     <div className="hidden justify-end lg:flex w-full md:hidden">
//       <NavLinks />
//     </div>
//     {/* <div className="w-[75px]">
//       <ThemeToggle />
//     </div> */}
//     <div className="flex w-[75px] justify-end lg:hidden">
//       <button className='text-neutral-600' onClick={toggleNavbar}>{isOpen ? <X /> : <Menu />}
//       </button>
//     </div>
//   </nav>
//   {isOpen && (<div className='flex flex-col items-center basis-full py-4'>
//     <NavLinks />
//   </div>)}
//   </>
//   )
// }

// export default Nav