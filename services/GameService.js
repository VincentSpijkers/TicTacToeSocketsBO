let GameService = class {

    createBoard(roomId){
        globalRooms[roomId].gameboard = [
            [' ',' ',' '],
            [' ',' ',' '],
            [' ',' ',' '],
        ]
    }

    placeAMove(position, player, roomId){
        if (globalRooms[roomId].gameboard[position.x][position.y] !== ' '){
            return;
        }

        globalRooms[roomId].gameboard[position.x][position.y] = player.type;
        if (this.checkForWinCondition(roomId)){
            console.log("Someone has won!!")
        }


    }

    checkForWinCondition(roomId){
        return this.checkHorizontalWinCondition(roomId) || this.checkVerticalWinCondition(roomId) || this.checkDiagonalWinCondition(roomId);
    }

    checkVerticalWinCondition(roomId){
        let pattern = "";
         for (let i = 0; i < globalRooms[roomId].gameboard.length; i++) {
           for (let j = 0; j < globalRooms[roomId].gameboard[i].length; j++) {
             pattern += globalRooms[roomId].gameboard[j][i];
           }
        }
         return this.hasWon(pattern);
    }

    checkHorizontalWinCondition(roomId){
        let pattern = "";
        for (let i = 0; i < globalRooms[roomId].gameboard.length; i++) {
            for (let j = 0; j < globalRooms[roomId].gameboard[i].length; j++) {
                pattern += globalRooms[roomId].gameboard[i][j];
            }
        }
        return this.hasWon(pattern);
    }

    checkDiagonalWinCondition(roomId){
        let pattern = globalRooms[roomId].gameboard[0][0] + globalRooms[roomId].gameboard[1][1] + globalRooms[roomId].gameboard[2][2];
        pattern += globalRooms[roomId].gameboard[2][0] + globalRooms[roomId].gameboard[1][1] + globalRooms[roomId].gameboard[0][2];

        return this.hasWon(pattern);
    }

    hasWon(pattern) {
        console.log(pattern)
        return pattern.includes('xxx') || pattern.includes("ooo");
    }

}

module.exports = GameService;