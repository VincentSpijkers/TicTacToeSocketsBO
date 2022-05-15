let GameService = class {
    constructor() {
        this.gameboard = [
            ['','',''],
            ['','',''],
            ['','',''],
        ];
    }

    placeAMove(position, player){
        console.log(this.gameboard)
        if (this.gameboard[position.x][position.y] !== ''){
            return;
        }

        this.gameboard[position.x][position.y] = player.type;
        if (this.checkForWinCondition()){
            console.log("Someone has won!!")
        }


    }

    checkForWinCondition(){
        return this.checkHorizontalWinCondition() || this.checkVerticalWinCondition() || this.checkDiagonalWinCondition();
    }

    checkVerticalWinCondition(){
        let pattern = "";
         for (let i = 0; i < this.gameboard.length; i++) {
           for (let j = 0; j < this.gameboard[i].length; j++) {
             pattern += this.gameboard[j][i];
           }
        }
         return this.hasWon(pattern);
    }

    checkHorizontalWinCondition(){
        let pattern = "";
        for (let i = 0; i < this.gameboard.length; i++) {
            for (let j = 0; j < this.gameboard[i].length; j++) {
                pattern += this.gameboard[i][j];
            }
        }
        return this.hasWon(pattern);
    }

    checkDiagonalWinCondition(){
        let pattern = this.gameboard[0][0] + this.gameboard[1][1] + this.gameboard[2][2];
        pattern += this.gameboard[2][0] + this.gameboard[1][1] + this.gameboard[0][2];

        return this.hasWon(pattern);
    }

    hasWon(pattern) {
        return pattern.includes('xxx') || pattern.includes("ooo");
    }

}

module.exports = GameService;