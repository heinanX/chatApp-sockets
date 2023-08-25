export interface IRoomMessage {
  room: string;
  message: string;
  username: string; // Lägger till namnet på avsändaren
  timestamp: string; // lägger till tiden då medelandet skickades
}

export interface IChatRoomProps {
    roomName: string | null,
    message?: IRoomMessage;
    setMessage?: React.Dispatch<React.SetStateAction<IRoomMessage>> //React.Dispatch<React.SetStateAction<string>>;
    messages?: IRoomMessage[];
    setMessages?: React.Dispatch<React.SetStateAction<IRoomMessage[]>>; //React.Dispatch<React.SetStateAction<never[]>>

  }