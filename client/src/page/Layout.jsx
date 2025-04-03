import React from "react";
import Home from "./Home";
import { BiLogOutCircle } from "react-icons/bi";
import useLogout from "../hooks/useLogout";
import { IoSettingsSharp } from "react-icons/io5";

function Layout() {
  const { handleLogout } = useLogout();

  return (
    <>
      
      <div className=" flex justify-center">
        <div className="hidden lg:flex justify-center pt-3 h-screen w-[5%] bg-gradient-to-b from-indigo-600 to-indigo-400  shadow-[0_3px_10px_rgb(0,0,0,0.8)]  z-0">
          <div className="">
            <button onClick={handleLogout} className=" flex justify-center hover:text-white ">
              <BiLogOutCircle color="white" size={40} />
            </button>
            <div className="absolute bottom-10 flex items-end justify-center ">
              <IoSettingsSharp size={40} color="white" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          {/* <Messages /> Assuming Messages is your main chat component */}
          <Home />
        </div>
      </div>
    </>
  );
}

export default Layout;
