
import Nav from "./Nav";
import {HeaderLogo } from "./Button"

const Header = () => {
  
  return (
    <header className="sticky top-0 z-[20] mx-auto  flex w-full max-w-7xl flex-wrap items-center justify-between border-b border-gray-100 bg-neutral-300 py-4 px-6  font-bold  backdrop-blur-[100px] dark:border-gray-800 dark:bg-neutral-700 dark:text-white">
      <HeaderLogo /> 
      <Nav />
    </header>
 
  )
}

export default Header