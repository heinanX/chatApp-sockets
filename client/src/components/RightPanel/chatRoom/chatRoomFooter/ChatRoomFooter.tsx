
import { useSocket } from "../../../../Context/SocketContext/SocketContext"
import "./ChatRoomFooter.css"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons'

function ChatRoomFooter() {

    const { currentRoom, sendMessage, username, sendActiveWriter, currentWriters } = useSocket();
    const [message, setMessage] = useState('');

    const timestamp = String(new Date(Date.now()).getHours()).padStart(2, "0") + ":" + String(new Date(Date.now()).getMinutes()).padStart(2, "0")  // < --- Tid för meddelandet

    const handleSendMessage = () => {
        const room = currentRoom ? currentRoom : "Lobby";
        (message.trim() !== '') && sendMessage({ message: message.trim(), room: room, username: username, timestamp: timestamp })
        setMessage('');
    };

    const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key == 'Enter') {
            handleSendMessage()
        }
    }

    useEffect(() => {
    }, [message, currentWriters])

    return (
        <div className="chatroom-footer">
            {currentWriters.length === 1 && <div className="currentWriter"><p>{currentWriters[0]?.username} skriver... </p> <FontAwesomeIcon className="faFaceLaugh" icon={faFaceLaugh as IconProp} bounce /> </div>}
            {currentWriters.length > 1 && <div className="currentWriter"><p>{currentWriters[0]?.username} och {currentWriters.length - 1} till skriver... </p> <FontAwesomeIcon className="faFaceLaugh" icon={faFaceLaugh as IconProp} bounce /> </div>}
            <div className="footerContent">
                <input
                    type="text"
                    value={message}
                    onChange={e => {
                        setMessage(e.target.value)
                        sendActiveWriter();
                    }}
                    onKeyDown={(e) => enterKey(e)}
                />
                <button onClick={handleSendMessage}>→</button>
            </div>
        </div>
    )
}

export default ChatRoomFooter;