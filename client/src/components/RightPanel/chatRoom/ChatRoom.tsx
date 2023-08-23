
import { useSocket } from "../../../Context/SocketContext/SocketContext"
import "./ChatRoom.css"
import ChatRoomHeader from "./chatRoomHeader/ChatRoomHeader";
import "../../../../assets/lobby.png"
import ChatroomBody from "./ChatroomBody/ChatroomBody";

function ChatRoom() {
    const { currentRoom } = useSocket()
    const cond = currentRoom == 'Lobby' ?  "url(../../../../assets/lobby.png)" : "none"

    return (
        <div className="chatroom" style={{backgroundImage: cond}}>
            <ChatRoomHeader roomName={currentRoom} />
            <ChatroomBody />
        </div>
    )
}

export default ChatRoom