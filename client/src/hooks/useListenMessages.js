import { useEffect } from "react";

import { useSocketContext } from "../contexAPI/useSocket";
import {useConversationsContext} from '../contexAPI/useCovesation'


const useListenMessages = () => {
	const { socket } = useSocketContext();
	const { messages, setMessages } = useConversationsContext();

	useEffect(() => {
		socket?.on("newMessage", (newMessage) => {

			
			setMessages([...messages, newMessage])

		});
		return () => socket?.off("newMessage");
	}, [socket, setMessages, messages]);
};
export default useListenMessages;