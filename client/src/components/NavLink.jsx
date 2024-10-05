import { Avatar, Dropdown, Navbar, NavbarToggle } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toggleTheme } from '../app/theme/themeSlice';
import { signoutSuccess } from '../app/user/userSlice';
import { HeaderLogo, SigninButton, SignupButton } from './Button';

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <Navbar className='border-b-[1px] dark:bg-[#101318] bg-[#a0c6fa] dark:border-b-[#45484e] border-b-[#83b5fa]'>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold'
      >
        <HeaderLogo /> 
      </Link>
      <form className="hidden lg:inline relative w-[300px] items-center justify-between mt-4 lg:mt-0" onSubmit={handleSubmit}>
        <input type="text" className='py-[4px] px-2 rounded-md w-full border-[1px] border-[#83b5fa] dark:border-[#9ba3b4]  outline-none  dark:border-opacity-60 transition duration-200 text-[#1f2a39]  dark:bg-transparent focus:outline-none' id="email" placeholder="Search ..."/> 
        <button className="absolute right-2 top-[.5rem]"><AiOutlineSearch className="text-[#384d6b] font-bold text-lg hover:dark:text-[#8f9195]"/>
        </button>         
    </form> 
      <div className='md:order-2 mx-4'>     
        <div className='hidden lg:inline-flex gap-8'>
        {currentUser ? (
          <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar rounded  alt='user' img={currentUser.profilePicture}/>}
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
          
        ) : (
          <Link to='/sign-in'>
            <SigninButton  />    
          </Link>
        )}
    <button color="gray" className="hidden lg:flex w-8 h-8 rounded-full my-auto dark:text-[#7a838a]  items-center "  onClick={() => dispatch(toggleTheme())}>
      {theme === 'light' ? <FaSun /> : <FaMoon />}
    </button>
        </div>

        <NavbarToggle />
      </div>
      <Navbar.Collapse className=' p-5 text-center font-bold text-lg focus:ring-0 '>
        <Navbar.Link active={path === '/'}  as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/courses'>Courses</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'}>
          <Link to='/contact'>Contact</Link>
        </Navbar.Link>
        <div className='my-6 flex items-center justify-center gap-8 lg:hidden'>
        <Link to="/sign-in" ><SigninButton /></Link>
        <Link to="/sign-up" className=" border-[1px] rounded-md"><SignupButton/></Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
//alt='user' inline img={currentUser.profilePicture} rounded 