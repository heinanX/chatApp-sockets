
import { useSocket } from "../../../../Context/SocketContext/SocketContext"
import "./ChatRoomFooter.css"
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons'

function ChatRoomFooter() {

    const { currentRoom, sendMessage, username, sendActiveWriter, currentWriters, apiKey } = useSocket();
    const [message, setMessage] = useState('');

    const timestamp = String(new Date(Date.now()).getHours()).padStart(2, "0") + ":" + String(new Date(Date.now()).getMinutes()).padStart(2, "0")  // < --- Tid för meddelandet

    const handleSendMessage = () => {
        const room = currentRoom ? currentRoom : "Lobby";
        if (message.includes("/gif")) {
            
                // const API_KEY = process.env.REACT_APP_API_KEY;
                const API_URL = "https://api.giphy.com/v1/gifs/trending";
            
                const url = `${API_URL}?api_key=${apiKey}`;
            
                const randomIndex = Math.floor(Math.random() * 50); // <------ slumpar ett tal mellan 1 och 50
            
               
                    // hämtar gifs från GIPHY
            
                    const fetchGif = async () => {
                        try {
                            const res = await fetch(url);
            
                            if (!res.ok) {
                                throw new Error("hämtningen från GIPHY misslyckades");
                            }
            
                            const data = await res.json(); // <----- ger 50 st gifs
            
                            console.log(data.data);
            
                            const randomGif = await data.data[randomIndex]; // sätter en slumpad gif
                            
                            const gif = await randomGif?.images.fixed_height_small.url
                            console.log("gif i sendmessage: ", gif);
                            
                            (message.trim() !== '') && sendMessage({gif: gif, message: message.trim(), room: room, username: username, timestamp: timestamp })
                            setMessage('');
            
                        } catch (error) {
                            console.log(error);
                        }
                    };

                    fetchGif()

        } else {
            (message.trim() !== '') && sendMessage({gif: undefined, message: message.trim(), room: room, username: username, timestamp: timestamp })
                            setMessage('');
        }
       
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