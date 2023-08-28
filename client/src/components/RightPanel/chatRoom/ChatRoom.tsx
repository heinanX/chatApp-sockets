
import { useSocket } from "../../../Context/SocketContext/SocketContext";
import "../../../../assets/lobby.png";
import "./ChatRoom.css";
import ChatRoomBody from "./ChatroomBody/ChatRoomBody";
import ChatRoomFooter from "./chatRoomFooter/ChatRoomFooter";
import ChatRoomHeader from "./chatRoomHeader/ChatRoomHeader";
function ChatRoom() {

    const { currentRoom } = useSocket();
    const cond = currentRoom == 'Lobby' ? "url(../../../../assets/lobby-opa.png)" : "none"

    return (
        <div className="chatroom" style={{ backgroundImage: cond }}>
            <ChatRoomHeader roomName={currentRoom} />
            <ChatRoomBody />
            <ChatRoomFooter />
        </div>
    )
}

export default ChatRoom