import { useSocket } from '../../../Context/SocketContext/SocketContext';
//renderar ut alla rum i listan och sätter onClick på dom
const RoomList = () => {
  const { currentRoom, setCurrentRoom, roomsList } = useSocket();

  return (
    <div className="roomList">
      {roomsList.map((roomName) => (
        <div 
        className={currentRoom === roomName ? 'currentRoom' : ''}
        onClick={() => {setCurrentRoom(roomName)}}
        key={roomName}>
          {roomName}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
