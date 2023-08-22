
import { useState } from "react"
import { useSocket } from "../../../Context/SocketContext/SocketContext"
import "./roomCreator.css"
// skapar rum och uppdaterar currentRoom och kör därmed useEffect i SocketContext
const RoomCreator = () => {
    const { setCurrentRoom } = useSocket()
   const [value, setValue] = useState("")

   const createRoom = () => {
    setCurrentRoom(value)
    setValue('')
  }

   const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {    
    if (e.key == 'Enter') {
      createRoom()
    }

  }
  return (
     <div className="roomCreator">
    <input 
      value={value}
      onKeyDown={(e) => enterKey(e)}
      onChange={(e) => setValue(e.target.value)}
      placeholder= "skapa rum" type="text"
    />
    <button
    onClick={createRoom}>+</button>
</div>
  )
}

export default RoomCreator