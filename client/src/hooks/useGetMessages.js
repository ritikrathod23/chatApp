import React, { useEffect, useState } from 'react'
import { useConversationsContext } from '../contexAPI/useCovesation'
const API_URL = import.meta.env.VITE_LURL

const useGetMessages = () => {
  const [loading, setLoading ] = useState(false)
  const { messages, setMessages, selected } = useConversationsContext() 

  useEffect(()=>{
    setLoading(true)
    const getMessages = async () =>{
      try {
        const response = await fetch(`https://chatapp-x05b.onrender.com/msg/get/${selected._id}`, {
          method: 'GET',
          headers: {  
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      
          const data = await response.json();
          
          if (response.ok) {
            setMessages(data)
          } else {
            console.error(" failed:", data);
          }
          
        } catch (error) {
          console.error("Error connecting to server:", error);
        } finally{
          setLoading(false)
        }
    }
    if(selected?._id) getMessages()
  },[selected?._id, setMessages])

  return { loading, messages}
}
export default useGetMessages;