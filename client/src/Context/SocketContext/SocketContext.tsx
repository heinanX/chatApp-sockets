import { createContext, useEffect, useState, useContext, PropsWithChildren } from 'react';
import { io } from "socket.io-client";
import { IRoomMessage } from '../../utils/interfaces';

// INTERFACE
interface SocketContextData {

    username: string | null
    setUsername: React.Dispatch<React.SetStateAction<string>>
    currentRoom: string | null
    setCurrentRoom: React.Dispatch<React.SetStateAction<string>>
    isLoggedIn: boolean
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
    logIn: () => void
    joinRoom: () => void
    roomsList: string[]
    setRoomsList: React.Dispatch<React.SetStateAction<[]>>
    leaveLobby: () => void
    leaveRoom: (room: string | null) => void

    message: string
    setMessage: React.Dispatch<React.SetStateAction<string>>
    messages: string[]
    setMessages: React.Dispatch<React.SetStateAction<string[]>>;
    sendMessage: (message: IRoomMessage) => void

}

// DEFAULTVALUES
const defaultValues = {

    username: "",
    setUsername: () => { },
    currentRoom: "",
    setCurrentRoom: () => { },
    isLoggedIn: false,
    setIsLoggedIn: () => { },
    logIn: () => { },
    joinRoom: () => { },
    roomsList: [],
    setRoomsList: () => { },
    leaveLobby: () => { },
    leaveRoom: () => { },

    message: "",
    setMessage: () => { },
    messages: [],
    setMessages: () => { },

    sendMessage: () => { },
}

// Skapar socket Context
export const SocketContext = createContext<SocketContextData>(defaultValues);

// Socket variabeln är default unconnected
const socket = io("http://localhost:3000", { autoConnect: false });

// Krok för att använda context functionerna och variablerna i alla commponenter
export const useSocket = () => useContext(SocketContext)

// SOCKETPROVIDER
export function SocketProvider({ children }: PropsWithChildren) {

    // STATES
    const [username, setUsername] = useState<string>("")
    const [currentRoom, setCurrentRoom] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [roomsList, setRoomsList] = useState<[]>([]);

    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<string[]>([]);

    // Loggin function för landningssidan som även startar kopplingen till socket
    const logIn = () => {
        if (username) {
            socket.connect()
            setIsLoggedIn(true)
            setCurrentRoom("Lobby")
        } else {
            alert("Du måste ha ett namn")
        }
    }
    // tidigare createRoom, nu joinroom, då createroom inte behövs eftersom man joinar när man skapar ett rum)
    const joinRoom = () => {

        if (username !== "" && currentRoom !== "") {
            // stänger av lyssnaren på "active_rooms" medans vi joinar rum för att inte useEffecten ska köras flera gånger.
            socket.off("active_rooms");

            // Skickar en händelse till servern för att ansluta till det valda rummet
            socket.emit("join_room", currentRoom);

            // kopplar på "active_rooms" för att uppdatera rumslistan
            socket.on("active_rooms", (roomsList) => {
                setRoomsList(roomsList)

                // consoler som syns i webbläsaren
                console.log("Rumlista: ", roomsList);
                console.log("Du är i detta rummet: ", currentRoom);


            })

            socket.on('receiveMessage', (message: string) => {
                console.log(`message received: ${message}`);
                setMessages((prevMessages: string[]) => [...prevMessages, message]);
                console.log(`Messages are : ${messages}`);

              });
        }
    }

    // LeavLobbyfunktionen som körs från commponenten LeaveLobbyBtn
    const leaveLobby = () => {
        socket.disconnect()
        setIsLoggedIn(false)
        console.log("Hej då!");

    }

    const leaveRoom = (room: string | null) => {
        socket.emit("leave_room", room);
        socket.on("left_room", room => console.log(`${username} lämnade rum ${room}`));
    }

    const sendMessage = (message: IRoomMessage) => {
        console.log(`Sending message ${message.message} to room ${message.room}`);
        socket.emit("sendMessage", message);
    }

    // kör joinRoom() när currentRoom sätts
    useEffect(() => {
        joinRoom()

    }, [currentRoom]);

    return (
        <SocketContext.Provider value={
            { 
                username, 
                setUsername, 
                currentRoom, 
                setCurrentRoom, 
                isLoggedIn, 
                setIsLoggedIn, 
                logIn, 
                joinRoom, 
                roomsList, 
                setRoomsList, 
                leaveLobby, 
                leaveRoom,
                message,
                setMessage,
                messages,
                setMessages,
                sendMessage
                }
                }>
            {children}
        </SocketContext.Provider>
    );
}