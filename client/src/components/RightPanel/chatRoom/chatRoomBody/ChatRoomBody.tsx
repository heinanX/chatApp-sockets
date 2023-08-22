import { useEffect, useState } from "react";
import { useSocket } from '../../../../Context/SocketContext/SocketContext';
import { IChatRoomProps, IRoomMessage } from "../../../../utils/interfaces";
import "./ChatRoomBody.css";

function ChatRoomBody({ messages }: IChatRoomProps) {

    const { currentRoom } = useSocket()

    const [roomMessages, setRoomMessages] = useState<IRoomMessage[]>([]);
    useEffect(() => {
        const wantedRoomMessages: IRoomMessage[] = messages ? messages.filter(message => message.room === currentRoom) : []
        setRoomMessages(wantedRoomMessages);
    }, [messages, currentRoom]);

    return (
        <div className="chatroom-mid">
            {
                roomMessages && roomMessages.map((msg, index) => (
                    <p key={index}>{msg.message}</p>
                ))
            }
        </div>
    )
}

export default ChatRoomBody