const express = require("express")
const cors = require("cors")
const http = require("http") //http är inbyggt i node
const { Server } = require("socket.io");

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

const socketToUsername = [];

const roomInfo = {};

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
    socket.on("join_room", (roomName, username, oldRoom, setOldRoom) => {
        socket.join(roomName);

        if (!roomInfo[roomName]) { roomInfo[roomName] = [] }

        if (!oldRoom == "") {
            const index = roomInfo[oldRoom].indexOf(username)
            if (index != -1){
                roomInfo[oldRoom].splice(index, 1);
                if (oldRoom != "Lobby" && roomInfo[oldRoom].length === 0) {
                    delete roomInfo[oldRoom]
                }
            }
        }
        roomInfo[roomName].push(username)
        setOldRoom(roomName)
        console.log(roomInfo)
        io.emit("active_rooms", roomInfo)


        // Skickar ut uppdaterad lista på "activeRooms" till alla klienter
       // io.emit("active_rooms", )

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
