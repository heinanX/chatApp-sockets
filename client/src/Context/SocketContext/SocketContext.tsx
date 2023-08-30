import { createContext, useEffect, useState, useContext, PropsWithChildren } from 'react';
import { io } from "socket.io-client";
import { IRoomMessage } from '../../utils/interfaces';
import { SocketContextData } from '../../utils/interfaces';
import { ITypingUser } from '../../utils/types';

// DEFAULTVALUES
const defaultValues = {
    username: "",
    setUsername: () => { },
    currentRoom: "",
    setCurrentRoom: () => { },
    oldRoom: "",
    setOldRoom: () => { },
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
    currentWriters: [],
    setCurrentWriters: () => { },
    sendActiveWriter: () => { },
}

// Skapar socket Context
export const SocketContext = createContext<SocketContextData>(defaultValues);

// Socket variabeln är default unconnected
const socket = io("http://localhost:3000", { autoConnect: false });

// Krok för att använda context functionerna och variablerna i alla commponenter
export const useSocket = () => useContext(SocketContext)

let timer: number | null = null;

// SOCKETPROVIDER
export function SocketProvider({ children }: PropsWithChildren) {

    // STATES
    const [username, setUsername] = useState<string>("")
    const [currentRoom, setCurrentRoom] = useState<string>("")
    const [oldRoom, setOldRoom] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [roomsList, setRoomsList] = useState<[]>([]);
    const [message, setMessage] = useState<string>("");
    const [messages, setMessages] = useState<IRoomMessage[]>([]);
    const [currentWriters, setCurrentWriters] = useState<ITypingUser[]>([]); // <----- sätter currentWriters

    // Listeners
    const activeWriterListener = (isTyping: ITypingUser) => {
        const newArr = Array.from(currentWriters)
        newArr.push(isTyping);

        const uniqueUsersMap = new Map();
        newArr.forEach(user => {
            const key = user.username + user.room;
            if (user.username !== "" && !uniqueUsersMap.has(key)) {
                uniqueUsersMap.set(key, user);
            }
        });
        const uniqueTypingUsersList = Array.from(uniqueUsersMap.values());
        setCurrentWriters(uniqueTypingUsersList)
    }

    const notActiveWriterListener = (isNotTyping: ITypingUser) => {
        const newArr = Array.from(currentWriters)
        const filteredArr = newArr.filter(user => user.username !== isNotTyping.username)
        setCurrentWriters(filteredArr)
    }

    const messageListener = (msg: IRoomMessage) => {
        setMessages(prevMessages => [...prevMessages, msg]);
    };

    // Login function för landningssidan som även startar kopplingen till socket
    const logIn = () => {
        if (username) {
            // Connectar till servern
            socket.connect()
            // Kollar om username finns i "activeUsers" på servern
            socket.emit("checkUsername", username);
            // Nar servern skickar statuskoden pa username, sa satts lobbyn och inloggad status, eller en alert att namn redan taget
            socket.on("usernameStatus", (status) => {
                if (status === "available") {
                    setIsLoggedIn(true)
                    setCurrentRoom("Lobby")

                } else {
                    alert('Anvandare redan tagen');
                }
            })

        } else {
            alert("Du måste ha ett namn")
        }
    }
    // tidigare createRoom, nu joinroom, då createroom inte behövs eftersom man joinar när man skapar ett rum)
    const joinRoom = () => {

        if (username !== "" && currentRoom !== "") {

            if (oldRoom !== "") {
                leaveRoom(oldRoom, username);
            }
            // stänger av lyssnaren på "active_rooms" medans vi joinar rum för att inte useEffecten ska köras flera gånger.
            socket.off("active_rooms");

            // Skickar en händelse till servern för att ansluta till det valda rummet
            socket.emit("join_room", currentRoom, username, oldRoom, setOldRoom);

            // kopplar på "active_rooms" för att uppdatera rumslistan
            socket.on("active_rooms", (rooms) => {
                setRoomsList(rooms);
            })
        }
    }

    // LeavLobbyfunktionen som körs från commponenten LeaveLobbyBtn
    const leaveLobby = () => {
        //socket.disconnect()
        socket.emit("disconnect_user", username, oldRoom)
        socket.on("active_rooms", (rooms) => {
            setRoomsList(rooms);
        })
        setIsLoggedIn(false)
        console.log("Hej då!");
        setCurrentRoom("")

    }

    const leaveRoom = (oldRoom: string, username: string) => {
        socket.emit("leave_room", oldRoom, username)
    }

    const sendMessage = (message: IRoomMessage) => {
        socket.emit("sendMessage", message);
    }

    const sendActiveWriter = () => {
        if (timer === null) {
            socket.emit("activeWriter", { username: username, room: currentRoom });
            timer = setTimeout(() => {
                timer = null;
                sendNotActiveWriter();
            }, 5000)
        }
    }

    const sendNotActiveWriter = () => {
        socket.emit("notActiveWriter", { username: username, room: currentRoom });
    }

    // kör joinRoom() när currentRoom sätts
    useEffect(() => {
        joinRoom();
        socket.on('receiveMessage', messageListener);

        return () => {
            socket.off('receiveMessage', messageListener);
        };
    }, [currentRoom]);

    useEffect(() => {
        socket.on('activeWriter', activeWriterListener);
        socket.on("notActiveWriter", notActiveWriterListener);

        return () => {
            socket.off('activeWriter', activeWriterListener);
            socket.off('notActiveWriter', notActiveWriterListener);
        };
    }, [currentWriters, messages]);

    return (
        <SocketContext.Provider value={
            {
                username,
                setUsername,
                currentRoom,
                setCurrentRoom,
                oldRoom,
                setOldRoom,
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
                sendMessage,
                currentWriters,
                setCurrentWriters,
                sendActiveWriter,
            }
        }>
            {children}
        </SocketContext.Provider>
    );
}