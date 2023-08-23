import { useEffect } from 'react';
import { useSocket } from '../../../Context/SocketContext/SocketContext';
//renderar ut alla rum i listan och sätter onClick på dom
const RoomList = () => {
  const { roomsList, setCurrentRoom, currentRoom } = useSocket();
 //currentRoom, setCurrentRoom, 
 useEffect(() => {
  console.log('this is from component 2',roomsList);
}, [roomsList]);


  return (
    <div className="roomList">
      <ul>
        {Object.entries(roomsList).map(([roomName, users]) => (
          <li key={roomName} className={currentRoom === roomName ? 'currentRoom' : ''}
          onClick={() => {setCurrentRoom(roomName)}}>
            <h3>{roomName}</h3>
            <ul>
            {Array.isArray(users) ? (
              users.map((user, index) => (
                <p key={index}>{user}</p>
              ))
            ) : (
              <p>No users in this room</p>
            )}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomList;
