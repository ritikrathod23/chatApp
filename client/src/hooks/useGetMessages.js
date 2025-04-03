import React, { useEffect, useState } from 'react'
import { useConversationsContext } from '../contexAPI/useCovesation'

const useGetMessages = () => {
  const [loading, setLoading ] = useState(false)
  const { messages, setMessages, selected } = useConversationsContext() 

  useEffect(()=>{
    setLoading(true)
    const getMessages = async () =>{
      try {
        const response = await fetch(`http://localhost:8000/msg/get/${selected._id}`, {
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