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
        <div style={{borderBottom: '2px solid rgb(31, 18, 31)', paddingLeft: '5px'}}>
        <h4 style={{display: 'inline'}}>Fudgesicles! Inte du #</h4>
        <h4 style={{display: 'inline', color: 'white'}}>{username}</h4>
        <h4 style={{display: 'inline'}}> !</h4>
        </div>
        <div style={{display:'flex', justifyContent: 'center'}}>
          <img src="../../../assets/cat.PNG" style={{width: '50%', maxWidth: '330px'}}/>
        </div>
        <RoomCreator />
        <RoomList />
      </div>
      <LeaveLobbyBtn />

    </div>
  )
}

export default LeftPanel