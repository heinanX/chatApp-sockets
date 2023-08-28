const express = require("express");
const cors = require("cors");
const http = require("http"); //http är inbyggt i node
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

app.use(cors());

// skapar ett set med aktiva rum
const activeRooms = new Set();
//Lägger in "Lobby" by default
activeRooms.add("Lobby");

const activeUsers = new Map();

const roomInfo = {};

//connectar client till socket
io.on("connection", (socket) => {
  // Kollar om username finns och skickar tillbaka status "available" eller "inUse" till clienten
  socket.on("checkUsername", (username) => {
    if (!activeUsers.has(username)) {
      socket.emit("usernameStatus", "available");
      activeUsers.set(username, socket.id);
      console.log(username + " with ID: " + socket.id + " joined chat!");
    } else {
      socket.emit("usernameStatus", "inUse");
    }
  });

  // Ansluter användaren till det specifika rummet
  socket.on("join_room", (roomName, username, oldRoom, setOldRoom) => {
    socket.join(roomName);
    console.log(username + " with ID: " + socket.id + " joined " + roomName);
    // Om roomName inte finns i roomInfo så skapas roomName med en tom array
    if (!roomInfo[roomName]) roomInfo[roomName] = [];

    // Lägger till username till rummet man ansluter till 
    roomInfo[roomName].push(username);
    // sätter oldroom till rumsnamnet man lämnar
    setOldRoom(roomName);
    // skickar roomInfo till clienten
    io.emit("active_rooms", roomInfo);
  });

  // Funktion som tar bort rum/ username från rum, körs i "leave_room" och "disconnect_user"
  const removeRoomInfo = (username, oldRoom) => {
    if (!oldRoom == "" && roomInfo[oldRoom]) {
      const index = roomInfo[oldRoom].indexOf(username);

      if (index != -1) {
        roomInfo[oldRoom].splice(index, 1);
        if (oldRoom != "Lobby" && roomInfo[oldRoom].length === 0) {
          delete roomInfo[oldRoom];
        }
      }
    }

    // Skickar ny info till clienten
    io.emit("active_rooms", roomInfo);
  };

  // lssnar på "leave_room" på clienten och kör removeRoomInfo funktionen
  socket.on("leave_room", (oldRoom, username) => {
    socket.leave(oldRoom);
    console.log(username + " with ID: " + socket.id + " left " + oldRoom);
    removeRoomInfo(username, oldRoom);
  });

  // lyssnar på "send_message" på clienten och kör funktionen
  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('receiveMessage', data);
  });

  socket.on('sendIsTyping', (data) => {
    io.to(data.room).emit('receiveIsTyping', data);
  });

  socket.on('sendIsNotTyping', (data) => {
    io.to(data.room).emit('sendIsNotTyping', data);
  });

  // lssnar på "disconnect_user" på clienten och kör removeRoomInfo funktionen
  socket.on("disconnect_user", (username, oldRoom) => {
    activeUsers.delete(username);
    removeRoomInfo(username, oldRoom);
    console.log(username + " with ID: " + socket.id + " has disconnected");
    // disconnectar från socket
    socket.disconnect();
  });

  
});

server.listen(3000, () => console.log("server is up and running"));
