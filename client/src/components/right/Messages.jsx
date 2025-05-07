  import React, { useEffect, useRef } from "react";
  import useGetMessages from "../../hooks/useGetMessages";
  import Message from "./Message";
  import useListenMessages from "../../hooks/useListenMessages";
  import { IoSendSharp } from "react-icons/io5";
import { useConversationsContext } from "../../contexAPI/useCovesation";
import { RiAccountCircleLine } from "react-icons/ri";

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
        <div className="h-[calc(100vh-80px)] text-gray-600 overflow-y-auto px-4 pt-24 pb-20 w-full bg-indigo-50">
          <div className="absolute top-0 left-0 right-0 z-10 bg-indigo-50 flex items-center px-4 py-3 gap-4 border-b border-gray-200">
          <div className=" w-16 rounded-full">
            {selected?.profile ? (
              <img
                className="w-16 h-16 outline-[3px] outline-gray-600  bg-slate-100 rounded-full"
                alt="User avatar"
                src={`data:image/png;base64,${selected?.profile}`}
            />
            ): (
              <RiAccountCircleLine
                className="mr-10 w-10 h-10 rounded-full" />
            )}
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg ">{selected?.name}</h3>
              <h5 className="text-sm ">{selected?.email}</h5>
            </div>
          </div>
          
          <div>
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
          </div>
      </>
    );
  }

  export default Messages;
