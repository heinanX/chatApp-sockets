import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../../../Context/SocketContext/SocketContext";
import { IRoomMessage } from "../../../../utils/interfaces";
import "./ChatRoomBody.css";

function ChatRoomBody() {
  const { currentRoom, messages, username } = useSocket();

  const [roomMessages, setRoomMessages] = useState<IRoomMessage[]>([]);

  useEffect(() => {
    const wantedRoomMessages: IRoomMessage[] = messages
      ? messages.filter((message) => message.room === currentRoom)
      : [];
    setRoomMessages(wantedRoomMessages);
  }, [messages, currentRoom]);

  const messageContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // När roomMessages updateras med en ny meddelande så scrollar den automatiskt till ref. div's botten.
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight;
    }
  }, [roomMessages]);

  return (
    <div className="chatroom-body" ref={messageContainerRef}>
      {roomMessages &&
        roomMessages.map((msg, index) => (
          // Lagt till username och timestamp i chatRoomBody-displayen <--------
          // Classnamnet på meddelandet blir sender/recipient... <-----
          // ...beroende på försändare eller mottagare <-----
          <div
            key={index}
            className={username == msg.username ? "sender" : "recipient"}
          >
            <h4>{msg.username}:</h4>
            <div
              className={
                username == msg.username ? "senderColor" : "recipientColor"
              }
            >
              {msg.gif != undefined ? (
                <>
                  <img src={msg.gif} /> <p>{msg.message.replace("/gif", "")}</p>
                </>
              ) : (
                msg.message
              )}
            </div>

            <h6>{msg.timestamp}</h6>
          </div>
        ))}
    </div>
  );
}

export default ChatRoomBody;
