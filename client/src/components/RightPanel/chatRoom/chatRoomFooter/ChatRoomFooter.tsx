
import { useSocket } from "../../../../Context/SocketContext/SocketContext"
// import { IChatRoomProps } from "../../../../utils/interfaces";  // Används inte
import "./ChatRoomFooter.css"
import { useState, useEffect } from "react";

function ChatRoomFooter(/*{ roomName }: IChatRoomProps*/) { // roomName Används inte

    const { currentRoom, sendMessage, username, setIsWriting, setCurrentWriter } = useSocket()

    const [message, setMessage] = useState('');
    // const [roomMessages, setRoomMessages] = useState<string[]>([]); // Används inte

    const timestamp = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()  // < --- Tid för meddelandet

    const handleSendMessage = () => {
        const room = currentRoom ? currentRoom : "Lobby";
        (message.trim() !== '') && sendMessage({ message: message.trim(), room: room, username: username, timestamp: timestamp })
        setMessage('');
    };

    useEffect(() => {
        if (message != "") {
            setIsWriting(true)
        }
    }, [message])

    return (
        <div className="chatroom-footer">
            <div className="footerContent">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onBlur={() => {
                        setIsWriting(false)
                        setCurrentWriter("")
                    }}
                />
                <button onClick={handleSendMessage}>→</button>
            </div>
        </div>
    )
}

export default ChatRoomFooter