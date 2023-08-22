import { useSocket } from '../../../Context/SocketContext/SocketContext';
//renderar ut alla rum i listan och sätter onClick på dom
const RoomList = () => {
  const { currentRoom, setCurrentRoom, roomsList } = useSocket();
console.log("Alla rum",roomsList);

  return (
    <div className="roomList">

<ul>
      {Array.from(roomsList.entries()).map(([key, value]) => (
        <li key={key}>
           {value}
        </li>
      ))}
    </ul>

{/* <ul>{roomsList.values()}</ul>
   <ul>
      {roomsList.map((roomName) => (
      
        <li className={currentRoom === roomName ? 'currentRoom' : ''} onClick={() => {setCurrentRoom(roomName)}} key={roomName}>
          {roomName}
        <ul>
          <li>{roomName}</li>
        </ul>
        
        </li>
        
        
      ))} 
      </ul> */}

    </div>
  );
};

export default RoomList;
