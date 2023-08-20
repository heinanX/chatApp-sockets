import './LogIn.css'
import { useSocket } from '../../Context/SocketContext/SocketContext'

const LogIn = () => {

  const { setUsername, logIn } = useSocket()

  return (
    <div className='logIn--div'>
      <h1>chatDeFudgeApp</h1>
      <div>
        <p>Beach, ge mig ett namn!</p>
        <input
          className='user--input'
          type="text"
          placeholder='du maste ha ett namn'
          onChange={(e) => setUsername(e.target.value)} />
      </div>
      <button
        className='enter--btn'
        onClick={logIn}
      >Gör din entré</button>
    </div>
  )
}

export default LogIn