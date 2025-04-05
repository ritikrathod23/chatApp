import React, { useEffect, useState } from 'react'
const API_URL = import.meta.env.VITE_LURL
const useGetConversations = () => {
  const [loading, setLoading ] = useState(false)
  const [conversations, setConversations ] = useState([])

  useEffect(()=>{
    setLoading(true)
    const getConversation = async () =>{
      try {
        const response = await fetch(`${API_URL}/user/getusers`, {
          method: 'GET',
          headers: {  
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
      
          const data = await response.json();
          
          if (response.ok) {
            setConversations(data)
          } else {
            console.error(" failed:", data);
          }
          
        } catch (error) {
          console.error("Error connecting to server:", error);
        } finally{
          setLoading(false)
        }
    }
    getConversation()
  },[])

  return { loading, conversations}
}
export default useGetConversations;