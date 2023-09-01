import "./LogIn.css";
import { useSocket } from "../../Context/SocketContext/SocketContext";
import { useEffect, useRef, useState } from "react";

const LogIn = () => {
  const { setUsername, logIn, usernameStatus } = useSocket();
  const modalRef = useRef<HTMLDialogElement | null>(null);


  const [showModal, setShowModal] = useState(false);

  const enterKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key == "Enter") {
      logIn();
    }
  };

  const handleCloseDialog = () => {
    modalRef?.current?.close();
  };

  useEffect(() => {
    const showM = !(usernameStatus === "available");
    console.log({ showM });
    setShowModal(showM);
    modalRef?.current?.showModal();
  }, [usernameStatus]);

  return (
    <div className="logIn--div">
      <img src="../../../assets/cat.PNG" />
      <p>Beach, välj ett namn och börja snacka!</p>
      {showModal && (<dialog ref={modalRef}>
        <div>{usernameStatus}</div>
        <button onClick={handleCloseDialog}>Stäng</button>
      </dialog>)}
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
