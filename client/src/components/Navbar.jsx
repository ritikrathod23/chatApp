import React, {useState} from 'react'
import Searchbar from './Searchbar';
import { userData } from '../auth/userAuthID'
import { useToggleContext } from '../contexAPI/useToggle';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";
import useLogout  from "../hooks/useLogout"
import DropDownMenu from './DropDownMenu';
import { RiAccountCircleLine } from "react-icons/ri";

function Navbar() {
  const { handleLogout } = useLogout();
  const user = userData()
  const {isDrawerOpen, setIsDrawerOpen, toggleDrawer } = useToggleContext()
  return (
    <>
        <div className='w-full sticky h-[10%] flex items-center top-0 z-50  text-black    shadow-xl '>
          <div className="md:hidden p-4 ">
          <RxHamburgerMenu size={30} onClick={toggleDrawer} />
           
      </div>
        <Searchbar/>
        
        
          <div className=' ml-auto clipPath  flex justify-end text-white  items-center bg-gradient-to-r from-indigo-600 to-indigo-400   w-[40%] h-20 md:w-[30%]' >
            <p className='hidden md:block mr-6 text-xl '>{user.name}</p>
            
            {/* Profile Drop Down Menu */}
            <div className="hidden md:block mr-10 w-14 outline-[3px] outline-gray-300 h-14 rounded-full">
            {user?.profile ? (
            <img
              // onClick={handleLogout}
              className=" bg-cover hidden md:block mr-10 w-14 h-14 rounded-full"
              alt="Tailwind CSS chat bubble component"
              src={`data:image/png;base64,${user?.profile}`}
            />
            ) :(
            <RiAccountCircleLine
              className=" hidden md:block mr-10 w-14 h-14 rounded-full" />
           )}
            </div>
            
          
          </div>
        <DropDownMenu />

      </div>
    </>
  )
}

export default Navbar