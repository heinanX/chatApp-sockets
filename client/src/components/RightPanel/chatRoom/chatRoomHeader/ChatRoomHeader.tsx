import "./ChatRoomHeader.css"
import { useSocket } from '../../../../Context/SocketContext/SocketContext'
import { IChatRoomProps } from "../../../../utils/interfaces"

function ChatRoomHeader({ roomName }: IChatRoomProps) {

    const { leaveRoom, setCurrentRoom, currentRoom, username } = useSocket()

    const leaveRoomHandler = () => {
        leaveRoom(currentRoom, username)
        setCurrentRoom("Lobby")
    }

    const cond = currentRoom === 'Lobby' ? { backgroundColor: "#7C83BC" } : {};
    
    return (
        <div className="chatroom-header" style={cond}>
            {roomName}
            {
                // Vi render ut leave chat-knappen bara om man inte är i lobbyn eftersom vi har en leave lobby-knapp
                currentRoom !== "Lobby" && <div><button onClick={leaveRoomHandler} className="leaveChatroom--btn">Leave</button></div>
            }
        </div>
    )
}

export default ChatRoomHeader