
import { useSocket } from "../../../../Context/SocketContext/SocketContext"
// import { IChatRoomProps } from "../../../../utils/interfaces";  // Används inte
import "./ChatRoomFooter.css"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons'

function ChatRoomFooter(/*{ roomName }: IChatRoomProps*/) { // roomName Används inte

    const { currentRoom, sendMessage, username, setIsWriting, setCurrentWriter, currentWriter } = useSocket()

    const [message, setMessage] = useState('');
    // const [roomMessages, setRoomMessages] = useState<string[]>([]); // Används inte

    const timestamp = new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes()  // < --- Tid för meddelandet

    const handleSendMessage = () => {
        const room = currentRoom ? currentRoom : "Lobby";
        (message.trim() !== '') && sendMessage({ message: message.trim(), room: room, username: username, timestamp: timestamp })
        setMessage('');
    };

    const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {    
        if (e.key == 'Enter') {
          handleSendMessage()
          setIsWriting(false)
          setCurrentWriter("")
        }
    }

    useEffect(() => {
        if (message != "") {
            setIsWriting(true)
        }
    }, [message])

    return (
        <div className="chatroom-footer">
            {currentWriter ? <div className="currentWriter"><p>{currentWriter} skriver... </p> <FontAwesomeIcon className="faFaceLaugh" icon={faFaceLaugh as IconProp} bounce /> </div> : <></>}
            <div className="footerContent">
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    onKeyDown={(e) => enterKey(e)}
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

export default ChatRoomFooter;