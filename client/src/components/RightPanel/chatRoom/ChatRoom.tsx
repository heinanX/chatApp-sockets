
// import { useState } from "react";
import { useSocket } from "../../../Context/SocketContext/SocketContext"
// import { IRoomMessage } from "../../../utils/interfaces"; // <--- Behövs inte
import ChatRoomHeader from "./chatRoomHeader/ChatRoomHeader";
import ChatRoomBody from "./ChatRoomBody/ChatRoomBody";
import ChatRoomFooter from "./chatRoomFooter/ChatRoomFooter";
import "../../../../assets/lobby.png"
import "./ChatRoom.css"
function ChatRoom() {

    const { currentRoom } = useSocket();
    // const [message, setMessage] = useState<IRoomMessage>({ room: "", message: "", username: "", timestamp: "" }); // <--- Behövs inte
    // const [messages, setMessages] = useState<IRoomMessage[]>([]); // <--- Behövs inte
    const cond = currentRoom == 'Lobby' ? "url(../../../../assets/lobby-opa.png)" : "none"

    return (
        <div className="chatroom" style={{ backgroundImage: cond }}>
            <ChatRoomHeader roomName={currentRoom} />
            <ChatRoomBody
                // roomName={currentRoom} // <--- Behövs inte
                // messages={messages} // <--- Behövs inte
                // setMessages={setMessages} // <--- Behövs inte
                // message={message} // <--- Behövs inte
                // setMessage={setMessage} // <--- Behövs inte
            />
            <ChatRoomFooter /*roomName={currentRoom} <-----Används inte */ />
        </div>
    )
}

export default ChatRoom