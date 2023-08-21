import "./ChatRoomBody.css"
import { useSocket } from '../../../../Context/SocketContext/SocketContext'
import { IChatRoomProps } from "../../../../utils/interfaces"
import { useEffect, useState } from "react";

function ChatRoomBody({ roomName, messages, setMessages, message, setMessage }: IChatRoomProps) {

    const { currentRoom } = useSocket()

    const [roomMessages, setRoomMessages] = useState<string[]>([]);
    useEffect(() => {
        const wantedRoomMessages = []
            messages && messages.forEach(message => {
                message.room === currentRoom && wantedRoomMessages.push(message) // Hmmm... ska göra om detta men måste lämna nu
            });
      }, [messages]);
    
    return (
        <div className="chatroom-mid">
            {
                messages && messages.map((msg, index) => (
                    <p key={index}>{msg.message}</p>
                  ))
            }
        </div>
    )
}

export default ChatRoomBody