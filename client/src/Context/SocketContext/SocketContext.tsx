import { createContext, useEffect, useState, useContext, PropsWithChildren } from 'react';
import { io } from "socket.io-client";

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
    leaveRoom: () => { }
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

    // kör joinRoom() när currentRoom sätts
    useEffect(() => {
        joinRoom()

    }, [currentRoom]);

    return (
        <SocketContext.Provider value={{ username, setUsername, currentRoom, setCurrentRoom, isLoggedIn, setIsLoggedIn, logIn, joinRoom, roomsList, setRoomsList, leaveLobby, leaveRoom }}>
            {children}
        </SocketContext.Provider>
    );
}