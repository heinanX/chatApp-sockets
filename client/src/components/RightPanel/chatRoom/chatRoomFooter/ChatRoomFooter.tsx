
import { useSocket } from "../../../../Context/SocketContext/SocketContext"
import { IChatRoomProps } from "../../../../utils/interfaces";
import "./ChatRoomFooter.css"
import { useState } from "react";

function ChatRoomFooter({ roomName }: IChatRoomProps) {

    const { currentRoom, sendMessage } = useSocket()

    const [message, setMessage] = useState('');
    const [roomMessages, setRoomMessages] = useState<string[]>([]);

    const handleSendMessage = () => {
        const room = currentRoom ? currentRoom : "Lobby";
        (message.trim() !== '') && sendMessage({message: message.trim(), room: room})
        setMessage('');
      };

    return (
        <div className="chatroom-low">
            <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
            />
            <button onClick={handleSendMessage}>Send</button>
        </div>
    )
}

export default ChatRoomFooter