
import { useSocket } from "../../../../Context/SocketContext/SocketContext"
// import { IChatRoomProps } from "../../../../utils/interfaces";  // Används inte
import "./ChatRoomFooter.css"
import { useState } from "react";

function ChatRoomFooter(/*{ roomName }: IChatRoomProps*/) { // roomName Används inte

    const { currentRoom, sendMessage, username } = useSocket()

    const [message, setMessage] = useState('');
    // const [roomMessages, setRoomMessages] = useState<string[]>([]); // Används inte

    const timestamp = String(new Date(Date.now()).getHours()).padStart(2, "0") + ":" + String(new Date(Date.now()).getMinutes()).padStart(2, "0")  // < --- Tid för meddelandet

    const handleSendMessage = () => {
        const room = currentRoom ? currentRoom : "Lobby";
        (message.trim() !== '') && sendMessage({message: message.trim(), room: room, username: username, timestamp: timestamp})
        setMessage('');
      };

    return (
        <div className="chatroom-footer">
            <div className="footerContent">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>→</button>
            </div>
        </div>
    )
}

export default ChatRoomFooter