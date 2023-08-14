const express = require("express")
const cors = require("cors")
const http = require("http") //http är inbyggt i node
const {Server} = require("socket.io")

const app = express();
const server = http.createServer(app)
const io = new Server(server)

app.use(cors())

io.on("connection", (socket) => console.log("New client connected:" + socket.id))

server.listen(3000, () => console.log("server is up and running"))
