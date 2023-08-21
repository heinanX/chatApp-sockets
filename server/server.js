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

//connectar client till socket
io.on("connection", (socket) => {
  console.log("New client connected:" + socket.id);

  // Ansluter användaren till det specificerade rummet
  socket.on("join_room", (roomName) => {
    socket.join(roomName);
    console.log("User with Id: " + socket.id + " joined room: " + roomName);

    // Lägger till det joinade rummet i listan med aktiva rum
    activeRooms.add(roomName);
    // Skickar ut uppdaterad lista på "activeRooms" till alla klienter
    io.emit("active_rooms", Array.from(activeRooms));

    // Logg som syns i terminalen
    console.log(io.sockets.adapter.rooms);
  });

  // lssnar på "leave_room" (kanske inte behövs, vi får se...)
  socket.on("leave_room", (roomName) => {
    socket.leave(roomName);
    activeRooms.delete(roomName); // <-------------- denna kan vi använda när rummet är tomt
    console.log("Du lämnar rum", roomName);
    socket.emit("left_room", roomName);
  });

  socket.on('sendMessage', (data) => {
    io.to(data.room).emit('receiveMessage', data.message);
  });

  // Lyssnar på "disconnect" händelsen och logga när en användare har kopplat ifrån
  socket.on("disconnect", () => {
    console.log(socket.id + " has disconnected");
  });
});

server.listen(3000, () => console.log("server is up and running"));
