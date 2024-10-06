
import { Badge, Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { BiBuoy } from "react-icons/bi";
import { HiArrowSmRight, HiChartPie, HiInbox, HiOutlineArrowSmRight, HiShoppingBag, HiUser, HiViewBoards } from "react-icons/hi";
import { useLocation } from "react-router-dom";



const DashSidebar = () => {
    const location = useLocation();
    const [tab, setTab] = useState('');
    useEffect(() => {
      const urlParams = new URLSearchParams(location.search)
      const tabFromUrl = urlParams.get('tab')
      if (tabFromUrl) {
        setTab(tabFromUrl)
      }
      console.log(tabFromUrl);
    }, [location.search]);

    // const data = [
    //   {   
    //       icon: <HiUser /> ,
    //       title: "Profile",
    //       link: "/dashboard?tab=profile"
    //   },
    //   {   icon: <HiChartPie />,
    //       title: "Dashboard",
    //       link: "/dashboard"
    //   },
    //   {   icon: <HiViewBoards/>,
    //       title: "Classes",
    //       link: "/classes"
    //   },
    //   {   icon: <HiInbox/>,
    //     title: "Inbox",
    //     link: "/classes"
    //   },
    //   {   icon: <HiViewBoards/>,
    //     title: "Classes",
    //     link: "/classes"
    //   },
    //   {   icon: <HiViewBoards/>,
    //     title: "Classes",
    //     link: "/classes"
    //   }
    // ]
  return (
    // {/* all sidebar items */}
    <Sidebar className="w-full md:w-56 lg:w-72 h-full border-r-[1px] border-light-600 dark:border-dark-100 bg-light-500 dark:bg-dark-300"> 
      <Sidebar.Items className="my-6 ">
        <Sidebar.ItemGroup>          
          <Sidebar.Item href="/dashboard?tab=profile" icon={HiUser} active={ tab === "profile" } label={"User"} labelColor='light'  className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold">
            Profile
          </Sidebar.Item>      
          <Sidebar.Item href="/dashboard"  icon={HiChartPie} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold" >
            Dashboard
          </Sidebar.Item>
          <Sidebar.Item href="/about" icon={HiViewBoards} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold">
            Kanban
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiInbox} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold">
            Inbox
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiShoppingBag} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold">
            Products
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiArrowSmRight}  className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold ">
            Sign In
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiOutlineArrowSmRight} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold" >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold">
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold">
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy} className="bg-[#91bff5] hover:bg-[#79b3f7] text-[#093a72] dark:bg-[#45484e] dark:hover:bg-[#555961] dark:text-[#adb0b4] font-semibold">
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
      <Sidebar.CTA className="bg-light-500 dark:bg-dark-200 rounded-lg border-[1px] border-light-600 dark:border-dark-100">
        <div className="mb-3 flex items-center ">
          <Badge className="bg-light-50 text-dark-100 font-semibold">Notofication</Badge>
          <button
            aria-label="Close"
            className="-m-1.5 ml-auto inline-flex h-6 w-6 rounded-lg bg-light-600 p-1 text-white   dark:bg-dark-100 dark:text-dark-500 "
            type="button"
          >
            <svg
              aria-hidden
              className="h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
        <div className="mb-3 text-sm ">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. 
          Saepe non, enim libero vitae dolore 
          quam molestias 
        </div>
        <a
          className="text-sm text-light-800 dark:text-dark-50 underline font-semibold "
          href="#"
        >
          Turn new navigation off
        </a>
      </Sidebar.CTA>
    </Sidebar>
  )
}

export default DashSidebar
