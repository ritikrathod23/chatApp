import { createContext, useContext, useState } from "react";


export const ConversationsContext = createContext(null)

export const useConversationsContext = () => {
    return useContext(ConversationsContext)
}

export const ConversationProvider = ({children}) => {
    const [selected, setSelected ] = useState(null)
    const [messages, setMessages ] = useState([])


    return <ConversationsContext.Provider value={{ selected, setSelected, messages, setMessages }}>
    {children}
  </ConversationsContext.Provider>
}
