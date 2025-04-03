import React, { useState } from 'react'
import Messages from './Messages'
import useSendMessage from '../../hooks/useSendMessage'
import { useConversationsContext } from '../../contexAPI/useCovesation'
import { IoSendSharp } from "react-icons/io5";

function Right() {
  const {selected} = useConversationsContext()
  const [message, setMessage ] = useState()
  const {sendMessage, loading} = useSendMessage()



  const handleSend = async (event) => {
    event.preventDefault()
    if (!message) return;

    await sendMessage(message)
    setMessage("")

    
  }



  return (
  <>
    <div className='sm:md:w-[75%]  h-full z-0  '>
      {selected ? (
      <div>
      <Messages/>

      <div >
        <form 
        className='flex justify-center items-center h-20 sm:w-[100%] lg:w-[75%] absolute bottom-0 px-10 '
        onSubmit={handleSend} >
        <div className='h-18 w-full'>
          <hr className="border-solid my-2 justify-center border-gray-800 opacity-50 border-[1px] w-full "></hr>
          <div className='flex '>
          <input 
            className="w-full bg-indigo-50 h-14 border-none text-inherit placeholder-slate-500  outline-none backdrop-blur-md" 
            type ="text"
            name='msg'
            value={message || ''}
            onChange={(e) => setMessage(e.target.value)}
            id ="message"
            placeholder="Type message here......"
            />
            <button 
              type='submit'
              className=' flex justify-center  items-center bg-indigo-500 rounded-lg ml-1 w-20'>
              <IoSendSharp  color='white' size={30} />
            </button>
            </div>
          </div>
        </form>

          
      </div>
      </div>
    ) :(
        <div  className='w-full  h-[532px] text-center flex justify-center content-center items-center'>
          <p className='text-center  text-xl flex justify-center items-center' >
             No coversation, Please start a coversation 
          </p>
        </div>
      )}
      </div>
    </>
  )
}

export default Right