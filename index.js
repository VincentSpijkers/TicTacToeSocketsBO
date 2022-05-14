const RoomService = require('./RoomService.js')
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors')
const { Server } = require("socket.io");
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

const io = new Server(server);
const roomService = new RoomService();

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/lobby/generateId', function(req, res){
    let newLobbyId = roomService.generateLobbyId()
    res.send({'id': newLobbyId})
});

io.on('connection', (socket) => {
    console.log("user connected")

    socket.on('onRoom', (roomNumber) =>{
        socket.join(roomNumber);
        console.log(socket.id);
        roomService.addToRooms(roomNumber, socket.id);

        io.sockets.in(roomNumber).emit("onRoom", 'you joined room ' + roomNumber);
    })
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});