import { useSocket } from "../../Context/SocketContext/SocketContext"
import "./RightPanel.css"

const RightPanel = () => {
  const {currentRoom} = useSocket()
  return (
    <div className="rightPanel">{currentRoom}</div>
  )
}

export default RightPanel