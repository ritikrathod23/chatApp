import React from "react";
import { useConversationsContext } from "../../contexAPI/useCovesation";
import { useSocketContext } from "../../contexAPI/useSocket";
import { useToggleContext } from "../../contexAPI/useToggle";

function Coversationcards({ item, index, loading }) {
  const { selected, setSelected } = useConversationsContext() || {};
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(item._id);
  const {isDrawerOpen, setIsDrawerOpen, toggleDrawer} = useToggleContext()

  const isSelected = selected?._id === item._id;

  return (
    <>
      <div
          className={`p-2 flex items-center w-full h-20 gap-5 shadow-sm       hover:bg-gradient-to-r from-indigo-600 to-indigo-400      
          cursor-pointer ${
          isSelected
            ? "bg-gradient-to-r from-indigo-600 to-indigo-400  text-white"
            : ""
        }`}
        onClick={() => {
          setSelected(item);
        }}
        key={index}
      >
       

        <div 
          className={`my-auto chat-image ${isOnline ? "online " : ""} avatar`}
        >
          <div className=" w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg ">{item.name}</h3>
          <h5 className="text-sm ">{item.email}</h5>
        </div>
      </div>
    </>
  );
}

export default Coversationcards;
