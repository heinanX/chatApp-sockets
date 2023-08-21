
import { useSocket } from "../../../Context/SocketContext/SocketContext"
import "./ChatRoom.css"
import ChatRoomHeader from "./chatRoomHeader/ChatRoomHeader";


function ChatRoom() {
    const { currentRoom } = useSocket()

    return (
        <div className="chatroom">
            <ChatRoomHeader roomName={currentRoom} />
        </div>
    )
}

export default ChatRoom