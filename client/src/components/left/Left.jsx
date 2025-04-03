import React, {useState} from "react";
import useGetConversations from "../../hooks/useGetConversations";
import { useConversationsContext } from "../../contexAPI/useCovesation";
import Coversationcards from "./Coversationcards";
import Skeleton from "@mui/material/Skeleton";
import { RxCross1 } from "react-icons/rx";
import { useToggleContext } from "../../contexAPI/useToggle";

function Left() {
  const { loading, conversations } = useGetConversations();
  const { selected, setSelected } = useConversationsContext() || {};

  const isSelected = selected?._id === conversations._id;
  const {isDrawerOpen, setIsDrawerOpen, toggleDrawer} = useToggleContext()

  const content = (
    <div className="flex flex-col w-full overflow-auto">
      {loading ? (
        <div className="flex flex-col items-center gap-1 justify-start h-[600px]">
          {[...Array(12)].map((_, i) => (
            <Skeleton key={i} variant="rectangular" width={240} height={60} />
          ))}
        </div>
      ) : (
        conversations?.map((item) => (
          <div key={item._id}>
            <Coversationcards
              loading={loading}
              index={item._id}
              item={item}
            />
          </div>
        ))
      )}
    </div>
  );

  return (
    <>
      {/* Sidebar for larger screens */}
      <div
        className="w-[20%] h-[calc(100vh-80px)] hidden md:flex overflow-auto bg-indigo-200 items-center flex-col
        shadow-[1_3px_10px_rgb(0,0,0,0.8)]"
      >
        {content}
      </div>

      {/* Drawer toggle button for smaller screens */}
      {/* <div className="md:hidden p-4">
        <button
          onClick={toggleDrawer}
          className="btn btn-primary drawer-button"
        >
          Open
        </button>
      </div> */}

      {/* Drawer for mobile view */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex"
          onClick={toggleDrawer}
        >
          <div
            className="bg-indigo-200 shadow-[1_3px_10px_rgb(0,0,0,0.8)] w-3/4 max-w-xs h-full flex flex-col p-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <RxCross1  
              className="self-end" 
              size={30}
              onClick={toggleDrawer}/>
            {content}
          </div>
        </div>
      )}
    </>
  );
}


export default Left;
