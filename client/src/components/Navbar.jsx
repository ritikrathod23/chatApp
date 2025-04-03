import React, {useState} from 'react'
import Searchbar from './Searchbar';
import { userData } from '../auth/userAuthID'
import { useToggleContext } from '../contexAPI/useToggle';
import { RxHamburgerMenu } from "react-icons/rx";
import { RxCross1 } from "react-icons/rx";


function Navbar() {
  const user = userData()
  const {isDrawerOpen, setIsDrawerOpen, toggleDrawer } = useToggleContext()
  return (
    <>
        <div className='w-full sticky h-[10%] flex items-center top-0 z-50  text-black    shadow-xl '>
          <div className="md:hidden p-4 ">
          <RxHamburgerMenu size={30} onClick={toggleDrawer} />
           
      </div>
        <Searchbar/>  
        <div className=' ml-auto clipPath  flex justify-end  items-center bg-gradient-to-r from-indigo-600 to-indigo-400   w-[30%] h-20'>
          <p className='hidden sm:block mr-6 text-xl '>{user.name}</p>
          <img
            className=" mr-2 w-14 h-14 rounded-full"
            alt="Tailwind CSS chat bubble component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />
        
        </div>

      </div>
    </>
  )
}

export default Navbar