import { createContext, useEffect, useState, PropsWithChildren } from 'react';
import { io, Socket } from "socket.io-client"; // Importera även 'Socket'

// interface RoomContext {
//     _id: string, // Ändra _Id till _id för att matcha din RoomContext-definition
//     roomName: string,
//     members: string[] // Använd 'any[]' eller specificera medlemstypen om möjligt
// }

interface SocketContextData {
    // users: string[] | null[], 
    // rooms: RoomContext[] | null[],
    socket: Socket | null,
}

export const SocketContext = createContext<SocketContextData | null>(null);

// export function useSocket() {

//     const context = useContext(SocketContext);
//     if (!context) {
//         throw new Error("useSocket must be used within a SocketProvider");
//     }
//     return context;
// }

export function SocketProvider({ children }: PropsWithChildren) {
    const [socket, setSocket] = useState<Socket | null>(null);
    // const [users, setUsers] = useState<string[]>([]); 
    // const [rooms, setRooms] = useState<RoomContext[]>([]);

    useEffect(() => {

        setSocket(io("http://localhost:3000", { autoConnect: false }));

        // Stäng anslutningen när komponenten avmonteras
        // return () => {
        //     newSocket.disconnect();
        // };
    }, []);



    return (
        <SocketContext.Provider value={{/*users, rooms,*/ socket: socket }}>
            {children}
        </SocketContext.Provider>
    );
}