import { FaDribbble, FaFacebook, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa"
import { Link } from "react-router-dom"
import { Logo } from "./Button"

const footerData = [
  {
    title: "About",
    link1: "Community",
    link2: "Announcement",
  },
  {
    title: "Accounts",
    link1:"Student-Results",
    link2:"Student-Fee",
  },
  {
    title: "Team",
    link1:"Teachers",
    link2:"Staff",
  },
  {
    title: "Contact",
    link1:"+099 9945 321",
    link2:"morningbuds@gmail.com",
  }
]
const footerIcon = [
  {
    href : "/",
    icon : <FaFacebook />
  },
  {
    href : "/",
    icon : <FaInstagram />
  },
  {
    href : "/",
    icon : <FaTwitter />
  },
  {
    href :'https://github.com/Fouzia-Oreen',
    icon : <FaGithub />
  },
  {
    href : "/",
    icon : <FaDribbble />
  },
]

const Footer = () => {
  return (
    <div className="border-t-[2px] border-[#83b5fa8a] py-6 lg:px-8 dark:border-[#8f9195]">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
      <Link to="/"><Logo /></Link>
          <div>
            <div className='grid w-full justify-evenly sm:flex md:grid-cols-2 lg:grid-cols-3 '>
                {footerData.map((data)  => (
                  <div className='mt-5 flex-flex-col gap-5 text-start p-4' key="data" >
                  <h2 className="text-lg font-bold hover:dark:text-[#8f9195]" key={data.title}>{data.title}</h2>
                  <Link to="/"><p className="text-sm mt-2  hover:dark:text-[#8f9195]"  key={data.link1}>{data.link1}</p></Link>
                  <Link to="/"><p className="text-sm mt-2 hover:dark:text-[#8f9195]"  key={data.link2}>{data.link2}</p></Link>           
                  </div>)
                )}
            </div>
          </div>   
      </div>

      <div className='w-full flex lg:flex-row flex-col items-center gap-4 justify-center border-t-[1px] border-[#18222c1e] mt-6 pt-6 font-semibold md:flex-row md:justify-evenly flex-shrink border-opacity-70'>
          <Link to='#'>Codoreen.io <span>{new Date().getFullYear()}</span></Link>
          <div className="flex gap-6 sm:justify-center  text-lg">
          {footerIcon.map((icon) => <Link to={icon.href} key ={icon} className=" transition duration-200 hover:dark:text-[#8f9195] hover:text-[#293c4dd5] ">{icon.icon}</Link>
           )}
          </div>
        </div>
    </div>
    
  );
}
export default Footer