import { useSocket } from '../../../../Context/SocketContext/SocketContext'
import "./ChatroomBody.css"

const ChatroomBody = () => {
const {currentRoom} = useSocket()
    const cond = currentRoom == 'Lobby' ?  "url(../../../../assets/lobby.png)" : "none"

  return (
    <div
    className='chatroomBody'
    style={{backgroundImage: cond}} 
    ></div>
  )
}

export default ChatroomBody