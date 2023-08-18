import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { SocketContext } from '../../../Context/SocketContext/SocketContext';
import "./LeaveLobbyBtn.css"

const LeaveLobbyBtn = () => {
    const socketContext = useContext(SocketContext); // hämtar socketContext

    if (!socketContext) {
        console.log("Socket context is not available");
        return null; // Avsluta komponenten om kontexten inte är tillgänglig
    }

    const { socket } = socketContext; // bryter ut socket ur socket context

    const leaveLobby = () => {
        if (socket) {
            socket.emit("disconnect", socket.id);
            console.log("You disconnected from " + socket.id);
        } else {
            console.log("Socket is not available");
        }
    };

    return (
        <Link to={"/"}>
            <button
                className="leaveLobby--btn"
                onClick={leaveLobby}>
                Leave Lobby
            </button>
        </Link>
    );
}



export default LeaveLobbyBtn