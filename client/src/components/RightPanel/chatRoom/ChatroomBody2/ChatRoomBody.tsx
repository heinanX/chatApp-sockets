import { useEffect, useState } from "react";
import { useSocket } from '../../../../Context/SocketContext/SocketContext';
import { IChatRoomProps, IRoomMessage } from "../../../../utils/interfaces";
import "./ChatRoomBody.css";

function ChatRoomBody({  }: IChatRoomProps) {

    const { currentRoom, messages } = useSocket()

    const [roomMessages, setRoomMessages] = useState<IRoomMessage[]>([]);
    useEffect(() => {
        const wantedRoomMessages: IRoomMessage[] = messages ? messages.filter(message => message.room === currentRoom) : []
        for (const m of wantedRoomMessages) {
            console.log(`wantedRoomMessages are : ${m.message} for room: ${m.room}`);
        }
        setRoomMessages(wantedRoomMessages);
    }, [messages, currentRoom]);

    return (
        <div className="chatroom-mid">
            {
                roomMessages && roomMessages.map((msg, index) => (
                   // messages && messages.map((msg, index) => (
                    <p key={index}>{msg.message}</p>
                ))
            }
        </div>
    )
}

export default ChatRoomBody