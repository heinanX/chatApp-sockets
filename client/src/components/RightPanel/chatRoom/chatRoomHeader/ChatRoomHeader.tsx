import "./ChatRoomHeader.css"
import { useSocket } from '../../../../Context/SocketContext/SocketContext'
import { ChatRoomProps } from "../../../../utils/interfaces"

function ChatRoomHeader({ roomName }: ChatRoomProps) {

    const { leaveRoom, setCurrentRoom, joinRoom, currentRoom } = useSocket()

    const leaveRoomHandler = () => {
        leaveRoom(roomName)
        setCurrentRoom("Lobby")
        joinRoom()
    }
    

    return (
        <div className="chatroom-header">
            <p>{roomName}</p>
            {
                // Vi render ut leave chat-knappen bara om man inte är i lobbyn eftersom vi har en leave lobby-knapp
                currentRoom !== "Lobby" && <div><button onClick={leaveRoomHandler} className="exit-chatroom">ⓧ</button></div>
            }
        </div>
    )
}

export default ChatRoomHeader