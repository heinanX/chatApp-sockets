
import { useState } from "react";
import { useSocket } from "../../../Context/SocketContext/SocketContext"
import "./ChatRoom.css"
import ChatRoomHeader from "./ChatRoomHeader/ChatRoomHeader";
import { IRoomMessage } from "../../../utils/interfaces";
import ChatRoomFooter from "./ChatRoomFooter/ChatRoomFooter";
import ChatroomBody from "./ChatroomBody/ChatroomBody";
import "../../../../assets/lobby.png"

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
            <ChatRoomFooter roomName={currentRoom} />
        </div>
    )
}

export default ChatRoom