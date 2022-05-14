let RoomService = class {
    constructor() {
        this.rooms = {};
        this.PLAYER_LIMIT = 2;
    }
    generateRoomId(){
        return Math.floor(Math.random() * 1000);
    }

    addToRooms(room, user){
        if(room in this.rooms){
            this.rooms[room].push(user);
            return;
        }
        this.rooms[room] = [user];
    }
}

module.exports = RoomService;