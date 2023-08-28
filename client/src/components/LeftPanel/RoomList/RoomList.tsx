import { useSocket } from '../../../Context/SocketContext/SocketContext';
//renderar ut alla rum i listan och sätter onClick på dom
const RoomList = () => {
  const { roomsList, setCurrentRoom, currentRoom } = useSocket();


  return (
    <div className="roomList">
      <ul>
        {Object.entries(roomsList).map(([roomName, users]) => (
          <li key={roomName} className={currentRoom === roomName ? 'currentRoom' : ''}
          onClick={() => {setCurrentRoom(roomName)}}>
            <h3 className='roomList--h3'>{roomName}</h3>
            <ul className='participants'>
            {Array.isArray(users) ? (
              users.map((user, index) => (
                <li key={index}>{user}</li>
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
