import { useSocket } from '../../../Context/SocketContext/SocketContext';
//renderar ut alla rum i listan och sätter onClick på dom

const RoomList = () => {
  const { currentRoom, setCurrentRoom, roomsList } = useSocket();
//console.log("Alla rum",roomsList);


roomsList.forEach(value => {
  console.log('users ' + value[1])
/*   value[2].forEach(element => {
    console.log(element)
  }); */
})

  return (
<div className="roomList">
  <ul>
    {roomsList.map((value, index) => (
      <li key={index}>
        <h3 className={currentRoom === value[0] ? 'currentRoom' : ''} onClick={() => {setCurrentRoom(value[0])}} key={value[0]}>{value[0]}</h3>
        <p>({value[1].length}) {Array.isArray(value[1]) ? value[1].join(', ') : value[1]}</p>
      </li>
    ))}
  </ul>
</div>

  );
};

export default RoomList;
