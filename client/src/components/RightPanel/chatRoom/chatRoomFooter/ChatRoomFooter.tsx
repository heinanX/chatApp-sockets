import { useSocket } from "../../../../Context/SocketContext/SocketContext";
import { useEffect, useState } from "react";
import { ITypingUser } from "../../../../utils/types";
import { IRoomMessage } from "../../../../utils/interfaces";
import "./ChatRoomFooter.css";

function ChatRoomFooter() {

    const { currentRoom, sendMessage, username, typingUsersList, sendIsTyping, sendIsNotTyping } = useSocket();

    const [message, setMessage] = useState<IRoomMessage>({ message: "", room: "" });
    useEffect(() => {

    }, [])

    let timer: number | null = null;
    const handleSetMessage = (m: any) => {
        const timestamp = String(new Date(Date.now()).getHours()).padStart(2, "0") + ":" + String(new Date(Date.now()).getMinutes()).padStart(2, "0")
        const msg = {
            message: m.typedMessage.trim(),
            room: currentRoom,
            username: username,
            timestamp: timestamp
        }
        setMessage(msg);

        const typingUser: ITypingUser = { username: username, room: currentRoom }
        let addUser = true;
        typingUsersList.forEach(typedUser => {
            typedUser.username === typingUser.username && (addUser = false)
        })
        if (timer === null) {
            addUser && sendIsTyping(typingUser)
            timer = setTimeout(() => {
                timer = null;
                sendIsNotTyping(typingUser)
            }, 5000)
        }
    }
    // const sendTyping = () => {
    //     const typingUser: ITypingUser = { username: username, room: currentRoom }
    //     let addUser = true;
    //     typingUsersList.forEach(typedUser => {
    //         typedUser.username === typingUser.username && (addUser = false)
    //     })
    //     if (timer === null) {
    //         addUser && sendIsTyping(typingUser)
    //         timer = setTimeout(() => {
    //             timer = null;
    //             sendIsNotTyping(typingUser)
    //         }, 5000)
    //     }
    // }
    const handleSendMessage = () => {
        (message.message.trim() !== '') && sendMessage(message)
        setMessage({ message: "", room: "" });
    };

    return (
        <div className="chatroom-footer">
            <div className="footerContent">
                <input
                    type="text"
                    value={message.message}
                    onChange={e => handleSetMessage({ typedMessage: e.target.value })}
                //onKeyDown={sendTyping}
                />
                <button onClick={handleSendMessage}>→</button>
            </div>
        </div>
    )
}

export default ChatRoomFooter