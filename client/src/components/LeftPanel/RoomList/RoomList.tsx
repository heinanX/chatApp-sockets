import { useSocket } from '../../../Context/SocketContext/SocketContext';
//renderar ut alla rum i listan och sätter onClick på dom
const RoomList = () => {
  const { setCurrentRoom, roomsList } = useSocket();

  return (
    <div className="roomList">
      {roomsList.map((roomName) => (
        <div 
        onClick={() => {setCurrentRoom(roomName)}}
        key={roomName}>
          {roomName}
        </div>
      ))}
    </div>
  );
};

export default RoomList;
