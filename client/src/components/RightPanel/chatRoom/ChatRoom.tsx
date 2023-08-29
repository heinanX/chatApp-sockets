import { useSocket } from "../../../Context/SocketContext/SocketContext"
import ChatRoomHeader from "./chatRoomHeader/ChatRoomHeader";
import ChatRoomBody from "./ChatroomBody/ChatRoomBody";
import ChatRoomFooter from "./chatRoomFooter/ChatRoomFooter";
import "../../../../assets/lobby.png"
import "./ChatRoom.css"
function ChatRoom() {

    const { currentRoom } = useSocket();
    const cond = currentRoom == 'Lobby' ? "url(../../../../assets/lobby-opa.png)" : "none"

    return (
        <div className= {currentRoom == "Lobby" ? "lobby" : "chatroom"} style={{ backgroundImage: cond }}>
            <ChatRoomHeader roomName={currentRoom} />
            <ChatRoomBody />
            <ChatRoomFooter />
        </div>
    )
}

export default ChatRoom