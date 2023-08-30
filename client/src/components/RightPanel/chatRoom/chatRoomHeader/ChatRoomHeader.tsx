import "./ChatRoomHeader.css"
import { useSocket } from '../../../../Context/SocketContext/SocketContext'
import { IChatRoomProps } from "../../../../utils/interfaces"

function ChatRoomHeader({ roomName }: IChatRoomProps) {

    const { leaveRoom, setCurrentRoom, currentRoom, username } = useSocket()

    const leaveRoomHandler = () => {
        leaveRoom(currentRoom, username)
        setCurrentRoom("Lobby")
    }
    
    return (
        <div className="chatroom-header" >
            {roomName}
            {
                // Vi render ut leave chat-knappen bara om man inte är i lobbyn eftersom vi har en leave lobby-knapp
                currentRoom !== "Lobby" && <div onClick={leaveRoomHandler} className="leaveChatroom--btn">x</div>
            }
        </div>
    )
}

export default ChatRoomHeader