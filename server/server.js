const express = require("express")
const cors = require("cors")
const http = require("http") //http är inbyggt i node
const {Server} = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
    }
})

app.use(cors())

//connectar client till socket
io.on("connection", (socket) => {

    console.log("New client connected:" + socket.id)









    // Lyssnar på "disconnect" händelsen och logga när en användare har kopplat ifrån
    socket.on("disconnect", () => {
        console.log(socket.id + " has disconnected");
    });

})

server.listen(3000, () => console.log("server is up and running"))
