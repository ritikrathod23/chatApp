import React from 'react'
import AuthId from '../../auth/userAuthID'

function Message({message, loading}) {

    const fromMe = message.senderId === AuthId()
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const bubbleBgColor = fromMe ? "bg-indigo-500 text-white" : "bg-indigo-100 text-gray-900";


  return (
    <div>
        <div className="px-4 sm:px-6 w-full max-w-4xl mx-auto">
          <div className={`chat ${chatClassName} w-full`}>
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <div className="chat-header text-xs text-gray-500">
              <time className="text-xs opacity-50 ">{Date.now()}</time>
            </div>
            <div className={`chat-bubble  ${ bubbleBgColor } max-w-[85%] sm:max-w-md`}>{message.message}</div>
            <div className="chat-footer opacity-50">Delivered</div>
          </div>
        </div>
    </div>
  )
}

export default Message