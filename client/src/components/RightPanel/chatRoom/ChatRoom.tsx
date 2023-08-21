
import { useState } from "react";
import { useSocket } from "../../../Context/SocketContext/SocketContext"
import "./ChatRoom.css"
import ChatRoomHeader from "./chatRoomHeader/ChatRoomHeader";
import ChatRoomBody from "./chatRoomBody/ChatRoomBody";
import { IRoomMessage } from "../../../utils/interfaces";


function ChatRoom() {

    const [message, setMessage] = useState<IRoomMessage>({room: "", message: ""});
    const [messages, setMessages] = useState<IRoomMessage[]>([]);

    const { currentRoom } = useSocket();

    return (
        <div className="chatroom">
            <ChatRoomHeader roomName={currentRoom} />
            <ChatRoomBody 
                roomName={currentRoom}
                messages={messages} 
                setMessages={setMessages}
                message={message} 
                setMessage={setMessage}  
                />
        </div>
    )
}

export default ChatRoom