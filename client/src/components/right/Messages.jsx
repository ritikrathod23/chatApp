  import React, { useEffect, useRef } from "react";
  import useGetMessages from "../../hooks/useGetMessages";
  import Message from "./Message";
  import useListenMessages from "../../hooks/useListenMessages";
  import { IoSendSharp } from "react-icons/io5";
import { useConversationsContext } from "../../contexAPI/useCovesation";

  function Messages() {
    const { messages, loading } = useGetMessages();
    const {selected} = useConversationsContext()


    useListenMessages();
    const lastMessageRef = useRef();

    useEffect(() => {
      setTimeout(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }, [messages]);

    return (
      <>
        <div className="h-[532px] z-0 pb-16 w-full bg-indigo-50 overflow-auto px-10">
          <div></div>
          <div 
            className="bg-indigo-50  z-10 fixed flex items-center w-full h-20 gap-5"
          >
            <img
              className="w-16 h-16 bg-slate-100 rounded-full"
              alt="User avatar"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
            <div className="flex flex-col">
              <h3 className="text-lg ">{selected?.name}</h3>
              <h5 className="text-sm ">{selected?.email}</h5>
            </div>
          </div>
          

          {!loading && messages.length === 0 ? (
            <div  className='w-full  h-[432px] text-center flex justify-center content-center items-center'>
            <p className='text-center  text-xl flex justify-center items-center' >
              No coversation, Please start a coversation 
            </p>
          </div>
          ) : (

            messages.map((message) => (
              <div key={message._id} ref={lastMessageRef}>
                <Message loading={loading} message={message} />
              </div>
            ))
          )}
          
          </div>
      </>
    );
  }

  export default Messages;
