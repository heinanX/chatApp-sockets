import './LogIn.css'
import { useSocket } from '../../Context/SocketContext/SocketContext'

const LogIn = () => {

  const { setUsername, logIn } = useSocket()

  return (
    <div className='logIn--div'>
      <img src="../../../assets/cat.PNG"/>
      <p>Beach, valj ett namn och borja snacka!</p>
      <div>

        <input
          className='user--input'
          type="text"
          placeholder='#MyNameIs'
          onChange={(e) => setUsername(e.target.value)} />
        <button
          className='enter--btn'
          onClick={logIn}
        >Gör din entré</button>
      </div>

    </div>
  )
}

export default LogIn