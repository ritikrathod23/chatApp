import { useState } from "react";
import { useConversationsContext } from "../contexAPI/useCovesation";
const API_URL = import.meta.env.URL

const useSendMessage = () => {
    const [loading, setLoading ] = useState(false)
    const { messages, setMessages, selected} = useConversationsContext()
    

    const sendMessage = async (message) => {
        setLoading(true)
        try {
          const response = await fetch(`https://chatapp-x05b.onrender.com/msg/send/${selected._id}`, {
            method: 'POST', 
            headers: {
              "Content-Type": "application/json", 
            },
            body: JSON.stringify({
             message: message
            }),
            credentials: "include"
          });
      
          // Parse the JSON response
          let data = await response.json();

          
          if (response.ok) {
            setMessages([...messages, data]);
          } else {
            console.error("Login failed:", data);
          }
        } catch (error) {
          console.error("Error connecting to server:", error);
        } finally{
            setLoading(false)
        }
      }
      return { sendMessage, loading };
}

export default useSendMessage;