import { useEffect, useState, useRef } from "react";
import { useSocket } from "../../../../Context/SocketContext/SocketContext";
import { IRoomMessage } from "../../../../utils/interfaces";
import "./ChatRoomBody.css";
import { motion } from "framer-motion";

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
          <motion.div
            key={index}
            className={username == msg.username ? "sender" : "recipient"}
            initial={{ opacity: 0, x: username == msg.username ? 90 : -90 }}
            whileInView={{
              opacity: 1,
              x: 0,
              transition: {
                type: "spring",
                bounce: 0.7,
                duration: 1,
                stiffness: 300,
              },
            }}
            exit={{ opacity: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
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
          </motion.div>
        ))}
    </div>
  );
}

export default ChatRoomBody;
