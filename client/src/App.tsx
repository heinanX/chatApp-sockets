import LogIn from './pages/LogIn/LogIn';
import Chat from './pages/Chat/Chat';
import { useSocket } from './Context/SocketContext/SocketContext';


const App = () => {

  const { isLoggedIn } = useSocket()

  return (

    isLoggedIn ? <Chat /> : <LogIn />


  )
}

export default App