import "./LogIn.css";
import { useSocket } from "../../Context/SocketContext/SocketContext";

const LogIn = () => {
  const { setUsername, logIn } = useSocket();
  const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      logIn();
    }
  };

  return (
    <div className="logIn--div">
      <img src="../../../assets/cat.PNG" />
      <p>Beach, välj ett namn och börja snacka!</p>
      <div>
        <input
          className="user--input"
          type="text"
          placeholder="#MyNameIs"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={(e) => enterKey(e)}
        />
        <button className="enter--btn" onClick={logIn}>
          Gör din entré
        </button>
      </div>
    </div>
  );
};

export default LogIn;
