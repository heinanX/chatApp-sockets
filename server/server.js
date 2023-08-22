const express = require("express")
const cors = require("cors")
const http = require("http") //http är inbyggt i node
const { Server } = require("socket.io");
const { log } = require("console");

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

app.use(cors())

// skapar ett set med aktiva rum
const activeRooms = new Set();
//Lägger in "Lobby" by default
activeRooms.add("Lobby")

const activeUsers = new Map();

const roomList = new Map()

//connectar client till socket
io.on("connection", (socket) => {

    // Kollar om username finns och skickar tillbaka status "available" eller "inUse" till clienten
    socket.on("checkUsername", (username) => {
        if (!activeUsers.has(username)) {
            socket.emit("usernameStatus", "available")
            activeUsers.set(username, socket.id)
        } else {
            socket.emit("usernameStatus", "inUse")
        }
    });

    // Ansluter användaren till det specifika rummet
    socket.on("join_room", (roomName, oldRoom, username, setOldRoom) => {
        socket.join(roomName);

        if (!roomList.has(roomName)) { roomList.set(roomName, []) }
        
        if (!oldRoom == "") {
            const oldRoomArray = roomList.get(oldRoom);
            const index = oldRoomArray.indexOf(username)
            if (index !== -1) {
                oldRoomArray.splice(index, 1);
                //console.log("oldroom", oldRoom);
                if (oldRoom != "Lobby" && oldRoomArray.length === 0) {
                    roomList.delete(oldRoom)
                }
            }
        }

        const roomArray = roomList.get(roomName);
        roomArray.push(username)
        roomList.set(roomName, roomArray)
        setOldRoom(roomName)


        roomList.forEach((usernames, roomNames) => {
            console.log(`Room: ${roomNames}, Users: ${usernames.join(", ")}`);
        });

        // console.log("User: " + username +  "joined room: " + roomName);

        // Lägger till det joinade rummet i listan med aktiva rum
        
        // Skickar ut uppdaterad lista på "activeRooms" till alla klienter
        io.emit("active_rooms", Array.from(roomList))
        console.log(activeUsers);
        // Logg som syns i terminalen
        //console.log(io.sockets.adapter.rooms.has(activeUsers.values()))

    });

    // lssnar på "leave_room" (kanske inte behövs, vi får se...) 
    socket.on("leave_room", (roomName) => {
        socket.leave(roomName)
        activeRooms.delete(roomName) // <-------------- denna kan vi använda när rummet är tomt
        console.log("Du lämnar rum", roomName);
        socket.emit("left_room", roomName);
    })





    // Lyssnar på "disconnect" händelsen och logga när en användare har kopplat ifrån
    socket.on("disconnect", () => {
        console.log(socket.id + " has disconnected");
    });

})

server.listen(3000, () => console.log("server is up and running"))
