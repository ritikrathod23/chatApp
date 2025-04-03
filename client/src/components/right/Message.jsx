import React from 'react'
import AuthId from '../../auth/userAuthID'

function Message({message, loading}) {

    const fromMe = message.senderId === AuthId()
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-indigo-500 text-white" : "bg-indigo-100 text-gray-900";


  return (
    <div>
        <div className=" mx-5 mt-20 ">
          <div className={`chat ${chatClassName} relative z-0`}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header">
              <time className="text-xs opacity-50">12:45</time>
            </div>
            <div className={`chat-bubble  ${ bubbleBgColor  }`}>{message.message}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        </div>
    </div>
  )
}

export default Message