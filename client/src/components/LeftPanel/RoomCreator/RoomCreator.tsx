
import { useState } from "react"
import { useSocket } from "../../../Context/SocketContext/SocketContext"
import "./roomCreator.css"
// skapar rum och uppdaterar currentRoom och kör därmed useEffect i SocketContext
const RoomCreator = () => {
    const { setCurrentRoom } = useSocket()
   const [value, setValue] = useState("")
    
  return (
     <div className="roomCreator">
    <input 
     
     onChange={(e) => setValue(e.target.value)}
    placeholder= "skapa rum" type="text" />
    <button
    onClick={() => setCurrentRoom(value)}>+</button>
</div>
  )
}

export default RoomCreator