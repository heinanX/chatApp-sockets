import { ITypingUser } from "./types";

export interface IRoomMessage {
  room: string;
  message: string;
  username?: string; // Lägger till namnet på avsändaren
  timestamp?: string; // lägger till tiden då medelandet skickades
}

export interface IChatRoomProps {
    roomName: string | null,
    message?: IRoomMessage;
    setMessage?: React.Dispatch<React.SetStateAction<IRoomMessage>> //React.Dispatch<React.SetStateAction<string>>;
    messages?: IRoomMessage[];
    setMessages?: React.Dispatch<React.SetStateAction<IRoomMessage[]>>; //React.Dispatch<React.SetStateAction<never[]>>

  }

export interface SocketContextData {

  username: string
  setUsername: React.Dispatch<React.SetStateAction<string>>
  currentUser: string,
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>
  typingUsersList: ITypingUser[],
  setTypingUsersList: React.Dispatch<React.SetStateAction<ITypingUser[]>>
  currentRoom: string
  setCurrentRoom: React.Dispatch<React.SetStateAction<string>>
  oldRoom: string | null
  setOldRoom: React.Dispatch<React.SetStateAction<string>>
  isLoggedIn: boolean
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
  logIn: () => void
  joinRoom: () => void
  roomsList: string[]
  setRoomsList: React.Dispatch<React.SetStateAction<[]>>
  leaveLobby: () => void
  leaveRoom: (oldRoom: string, username: string) => void
  message: IRoomMessage
  setMessage: React.Dispatch<React.SetStateAction<IRoomMessage>>
  messages: IRoomMessage[]
  setMessages: React.Dispatch<React.SetStateAction<IRoomMessage[]>>
  sendMessage: (message: IRoomMessage) => void
  sendIsTyping: (typingUser: ITypingUser) => void
  sendIsNotTyping: (typingUser: ITypingUser) => void

}