import { createContext, useEffect, useState, useContext, PropsWithChildren } from 'react';
import { io } from "socket.io-client";

// interface RoomContext {
//     _id: string,
//     roomName: string,
//     members: string[]
// }

interface SocketContextData {
    // users: string[] | null[] 
    // rooms: RoomContext[] | null[]
    // socket: Socket | null
    username: string | null
    setUsername: React.Dispatch<React.SetStateAction<string>>
    room: string | null
    setRoom: React.Dispatch<React.SetStateAction<string>>
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    logIn: () => void

}

const defaultValues = {

    username: "",
    setUsername: () => { },
    room: "",
    setRoom: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    logIn: () => { }
}

export const SocketContext = createContext<SocketContextData>(defaultValues);

const socket = io("http://localhost:3000", { autoConnect: false });

export const useSocket = () => useContext(SocketContext)

export function SocketProvider({ children }: PropsWithChildren) {
    const [username, setUsername] = useState<string>("")
    const [room, setRoom] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    // const [socket, setSocket] = useState<Socket | null>(null);
    // const [users, setUsers] = useState<string[]>([]); 
    // const [rooms, setRooms] = useState<RoomContext[]>([]);

    const logIn = () => {
        socket.connect()
        setIsLoggedIn(true)
    }

    useEffect(() => {

    }, [room]);

    return (
        <SocketContext.Provider value={{ username, setUsername, room, setRoom, isLoggedIn, setIsLoggedIn, logIn }}>
            {children}
        </SocketContext.Provider>
    );
}