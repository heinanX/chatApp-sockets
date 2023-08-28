import { createContext, useEffect, useState, useContext, PropsWithChildren } from 'react';
import { io } from "socket.io-client";
import { IRoomMessage } from '../../utils/interfaces';
import { SocketContextData } from '../../utils/interfaces';
import { ITypingUser } from '../../utils/types';

// DEFAULTVALUES
const defaultValues = {

    username: "",
    setUsername: () => { },
    currentUser: "",
    setCurrentUser: () => { },
    typingUsersList: [],
    setTypingUsersList: () => { },
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

    message: { room: "", message: "" },
    setMessage: () => { },
    messages: [],
    setMessages: () => { },
    sendMessage: () => { },
    sendIsTyping: () => { },
    sendIsNotTyping: () => { },
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
    const [currentUser, setCurrentUser] = useState<string>("");
    const [currentRoom, setCurrentRoom] = useState<string>("");
    const [typingUsersList, setTypingUsersList] = useState<ITypingUser[]>([{ username: "", room: "" }]);
    const [oldRoom, setOldRoom] = useState<string>("")
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [roomsList, setRoomsList] = useState<[]>([]);
    const [message, setMessage] = useState<IRoomMessage>({ room: "", message: "" });
    const [messages, setMessages] = useState<IRoomMessage[]>([]);

    // Listeners

    const messageListener = (msg: IRoomMessage) => {
        console.log(msg);

        setMessages(prevMessages => [...prevMessages, msg]);
        console.log(`message received: ${msg.message} from ${msg.room}`);
        console.log(`length of messages: ${messages.length}`);
        for (const m of messages) {
            console.log(`Messages are : ${m.message} for room: ${m.room}`);
        }
    };

    const isTypingListener = (isTyping: ITypingUser) => {
        const newArr = Array.from(typingUsersList)
        newArr.push(isTyping);

        const uniqueUsersMap = new Map();
        newArr.forEach(user => {
            const key = user.username + user.room;
            if (user.username !== "" && !uniqueUsersMap.has(key)) {
                uniqueUsersMap.set(key, user);
            }
        });

        const uniqueTypingUsersList = Array.from(uniqueUsersMap.values());

        console.log({ uniqueTypingUsersList });
        setTypingUsersList(uniqueTypingUsersList)
    }

    const isNotTypingListener = (isNotTyping: ITypingUser) => {
        const newArr = Array.from(typingUsersList)
        const filteredArr = newArr.filter(user => user.username !== isNotTyping.username)
        console.log({ filteredArr });
        setTypingUsersList(filteredArr)
    }

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
        console.log(`Sending message ${message.message} to room ${message.room}`);
        socket.emit("sendMessage", message);
    }

    const sendIsTyping = (isTyping: ITypingUser) => {
        socket.emit("sendIsTyping", isTyping);
    }

    const sendIsNotTyping = (isNotTyping: ITypingUser) => {
        socket.emit("sendIsNotTyping", isNotTyping);
    }

    // kör joinRoom() när currentRoom sätts
    useEffect(() => {
        joinRoom();
        socket.on('receiveMessage', messageListener);

        return () => {
            socket.off('receiveMessage', messageListener);
            leaveRoom(currentRoom, username);
        };
    }, [currentRoom]);

    useEffect(() => {
        joinRoom();
        socket.on('receiveIsTyping', isTypingListener);
        socket.on("sendIsNotTyping", isNotTypingListener);

        return () => {
            socket.off('receiveIsTyping', isTypingListener);
            socket.off('sendIsNotTyping', isNotTypingListener);
            leaveRoom(currentRoom, username);
        };
    }, [typingUsersList]);

    return (

        <SocketContext.Provider value={
            {
                username,
                setUsername,
                currentUser,
                setCurrentUser,
                typingUsersList,
                setTypingUsersList,
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
                sendIsTyping,
                sendIsNotTyping
            }
        }>
            {children}
        </SocketContext.Provider>
    );
}