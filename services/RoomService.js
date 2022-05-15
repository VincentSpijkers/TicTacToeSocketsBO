const Player = require('../models/Player')
const TooManyPlayerException = require('../shared/TooManyPlayersException')
let RoomService = class {
    constructor() {
        this.PLAYER_LIMIT = 2;
        this.player = null;
    }
    generateRoomId(){
        return Math.floor(Math.random() * 1000);
    }

    addToRooms(roomId, userId){
        if (this.hasTooManyPlayersInRoom(roomId)){
            throw new TooManyPlayerException("Too many players in this game")
        }

        this.player = new Player('x', userId)

        if(this.doesRoomExist(roomId)){
            this.player.type = 'o';
            globalRooms[roomId].push(this.player);
            console.log(this.player)
            return this.player;
        }
        globalRooms[roomId] = [this.player];

        return this.player;
    }

    hasTooManyPlayersInRoom(roomId){
        return this.doesRoomExist(roomId) && this.rooms[roomId].length >= this.PLAYER_LIMIT;
    }

    doesRoomExist(roomId){
        return roomId in this.rooms;
    }

    removeFromRoom(playerId){
        for(let room in this.rooms){
            let currentRoom = this.rooms[room];
            for (let i = 0; i < currentRoom.length; i++){
                let currentPlayer = currentRoom[i];
                if (currentPlayer.id === playerId){
                    this.rooms[room].splice(i, 1)
                }
            }
        }
    }
}

module.exports = RoomService;