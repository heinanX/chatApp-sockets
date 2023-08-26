import { useEffect, useState } from "react";
import { useSocket } from '../../../../Context/SocketContext/SocketContext';
import { /*IChatRoomProps,*/ IRoomMessage } from "../../../../utils/interfaces"; // <--- Behövs inte
import "./ChatRoomBody.css";

function ChatRoomBody() {

    const { currentRoom, messages, username } = useSocket()
    console.log("messages", messages);

    const [roomMessages, setRoomMessages] = useState<IRoomMessage[]>([]);
    useEffect(() => {
        const wantedRoomMessages: IRoomMessage[] = messages ? messages.filter(message => message.room === currentRoom) : []
        for (const m of wantedRoomMessages) {
            console.log(`wantedRoomMessages are : ${m.message} for room: ${m.room}`);
        }
        setRoomMessages(wantedRoomMessages);
    }, [messages, currentRoom]);

    return (
        <div className="chatroom-body">
            {
                roomMessages && roomMessages.map((msg, index) => (
                    // messages && messages.map((msg, index) => (

                    // Lagt till username och timestamp i chatRoomBody-displayen <--------
                    // Classnamnet på meddelandet blir sender/recipient... <-----
                    // ...beroende på försändare eller mottagare <-----
                    <div
                        key={index}
                        className={username == msg.username ? "sender" : "recipient"}> 
                        <h4>{msg.username}</h4>
                        <p>
                            {msg.message}
                        </p>
                        <h6>{msg.timestamp}</h6>
                    </div>
                ))
            }
        </div>
    )
}

export default ChatRoomBody