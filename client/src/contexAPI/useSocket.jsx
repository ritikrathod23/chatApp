import { createContext, useContext, useEffect, useState } from "react";
import AuthId from '../auth/userAuthID';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [socket, setSocket] = useState(null);
    const authUser = AuthId();

    useEffect(() => {
        
        if (authUser) {
            const newSocket = io('http://localhost:8000', { 
                query: { userId: authUser },
                withCredentials: true,
            });

            setSocket(newSocket);

            
            newSocket?.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
			});


            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [authUser]);

    return (
        <SocketContext.Provider value={{ socket, onlineUsers }}>
            {children}
        </SocketContext.Provider>
    );
};
