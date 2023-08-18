
import "./LeaveLobbyBtn.css"
import { useSocket } from '../../Context/SocketContext/SocketContext';

const LeaveLobbyBtn = () => {
const {leaveLobby} = useSocket()

    return (
        
            <button
                className="leaveLobby--btn"
                onClick={leaveLobby}>
                Leave Lobby
            </button>
    
    );
}



export default LeaveLobbyBtn