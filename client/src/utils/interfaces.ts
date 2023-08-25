export interface IRoomMessage {
  room: string;
  message: string;
}

export interface IChatRoomProps {
    roomName: string | null,
    message?: IRoomMessage;
    setMessage?: React.Dispatch<React.SetStateAction<IRoomMessage>> //React.Dispatch<React.SetStateAction<string>>;
    messages?: IRoomMessage[];
    setMessages?: React.Dispatch<React.SetStateAction<IRoomMessage[]>>; //React.Dispatch<React.SetStateAction<never[]>>

  }