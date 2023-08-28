import { useEffect, useState } from 'react';
import { useSocket } from '../../../../Context/SocketContext/SocketContext';
import { ITypingUser } from '../../../../utils/types';

function CurrentWriter() {
  const { username, typingUsersList } = useSocket();
  const [isTyping, setIsTyping] = useState<ITypingUser[] | []>([]);
  let typingTimeout: number | undefined = undefined;

  useEffect(() => {
    if (typingTimeout === undefined) {
      const newList = Array.from(typingUsersList)
      const removedUserList = newList.filter((typingUser) => { return typingUser.username !== username });

      setIsTyping(removedUserList);

      typingTimeout = setTimeout(() => {
        console.log("Current writer timout finished");

      }, 5000);
    }

    return () => {
      //clearTimeout(typingTimeout);
    };
  }, [typingUsersList]);

  return (
    <div className="typing-indicator">
      {isTyping.length === 1 && <span>{isTyping[0]?.username} is typing...</span>}
      {isTyping.length > 1 && <span>{isTyping[0]?.username} and {isTyping.length - 1} more users are typing...</span>}
    </div>
  );
};

export default CurrentWriter;
