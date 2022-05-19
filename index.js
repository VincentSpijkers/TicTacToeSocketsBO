const RoomService = require('./services/RoomService.js')
const GameService = require('./services/GameService.js')
const express = require('express');

const http = require('http');
const app = express();
const server = http.createServer(app);
const cors = require('cors')
const { Server } = require("socket.io");
const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200
}

const io = new Server(server);
const roomService = new RoomService();
const gameService = new GameService();

global.globalRooms = {};

app.use(cors(corsOptions))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/lobby/generateId', function(req, res){
    let newLobbyId = roomService.generateRoomId()
    res.send({'id': newLobbyId})
});

io.on('connection', (socket) => {
    console.log("user connected")

    socket.on('onRoom', (roomNumber) =>{
        let player;
        try{
            player = roomService.addToRooms(roomNumber, socket.id);
        }catch (error){
            console.log(error)
            io.to(socket.id).emit('tooManyPlayers', error.message)
            return;
        }

        socket.join(roomNumber);
        gameService.createBoard(roomNumber)
        io.sockets.in(roomNumber).emit("onRoom", 'you joined room ' + roomNumber);
        io.sockets.in(roomNumber).emit("gameboard", globalRooms[roomNumber].gameboard);
        io.to(socket.id).emit("player", player);
    })

    socket.on('placeAMove', (move) =>{
        const [, roomId] = socket.rooms;
        gameService.placeAMove(move.position, move.player, roomId);
        io.sockets.in(roomId).emit("gameboard", globalRooms[roomId].gameboard);
    })

    socket.on("disconnect", () => {
        roomService.removeFromRoom(socket.id)
        console.log('user disconnected');
    });
});


server.listen(3000, () => {
    console.log('listening on *:3000');
});