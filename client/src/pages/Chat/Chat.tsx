import LeftPanel from "../../components/LeftPanel/LeftPanel"
import RightPanel from "../../components/RightPanel/RightPanel"
import "./Chat.css"

const Chat = () => {
  return (
    <div className="chat">
      <LeftPanel />
      <RightPanel />
    </div>
  )
}

export default Chat