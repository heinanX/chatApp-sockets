
import { useSocket } from "../../../Context/SocketContext/SocketContext"
import "./ChatRoom.css"
import ChatRoomHeader from "./chatRoomHeader/ChatRoomHeader";
import "../../../../assets/lobby.png"
import ChatroomBody from "./ChatroomBody/ChatroomBody";

function ChatRoom() {
    const { currentRoom } = useSocket()

    return (
        <div className="chatroom">
            <ChatRoomHeader roomName={currentRoom} />
            <ChatroomBody />
        </div>
    )
}

export default ChatRoom