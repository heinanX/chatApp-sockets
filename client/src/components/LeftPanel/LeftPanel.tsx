import { useSocket } from "../../Context/SocketContext/SocketContext"
import LeaveLobbyBtn from "../LeaveLobbyBtn/LeaveLobbyBtn"
import RoomList from "./RoomList/RoomList"
import "./LeftPanel.css"
import RoomCreator from "./RoomCreator/RoomCreator"

const LeftPanel = () => {

    const {username } = useSocket()

  return (
    <div className="leftPanel--div">
      <div>
        <h4>{username} </h4>
        <RoomCreator />
        <RoomList />
      </div>
      <LeaveLobbyBtn />

    </div>
  )
}

export default LeftPanel