class Board {
    constructor() {
        this.squares = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        this.emptySquares = [];
        this.totalMrkdSqr = 0;
    }
    markSqr(row,col, player) {
        this.squares[row][col] = player;
    }

    isSquareEmpty(row,col) {
        return this.squares[row][col] === null;
    }

    boardState() {
        

        // returns 1 if x/a wins 2 if b/o wins else 0
        

        // horizontal wins

        for(let i=0;i<3;i++){
            if(((this.squares[i][0]==this.squares[i][1]) && (this.squares[i][1]==this.squares[i][2])) && (this.squares[i][0] !== null) )
                return this.squares[i][0]
        }

        // vertical wins

        for(let j=0;j<3;j++){
            if(((this.squares[0][j]==this.squares[1][j]) && (this.squares[1][j]==this.squares[2][j])) && (this.squares[0][j] !== null) )
                return this.squares[0][j]
        }

        // Diagonal wins

        if(((this.squares[0][0]==this.squares[1][1]) && (this.squares[1][1]==this.squares[2][2])) && (this.squares[0][0] !== null) )
            return this.squares[0][0]

        if(((this.squares[2][0]==this.squares[1][1]) && (this.squares[1][1]==this.squares[0][2])) && (this.squares[2][0] !== null) )
            return this.squares[2][0]

        return 0;
    }

    isfull() {
        return (this.totalMrkdSqr === 9)
    }
}

class Game {
    constructor() {
        this.board = new Board();
        this.player = 1;
        this.gameMode = "pvp"; //pvp and ai
    }

    makeMove(row,col, item) {
        this.board.markSqr(row,col, this.player);
        this.makeFig(item);
        this.changeTurn();
        this.board.totalMrkdSqr++;
    }

    changeTurn() {
        this.player = (this.player % 2) + 1;
    }

    makeFig(item) {
        let x_img = document.createElement("img");
        let o_img = document.createElement("img");
        x_img.src = "X.png";
        o_img.src = "O.png";
        if (this.player === 1) item.appendChild(x_img);
        else item.appendChild(o_img);
    }

    isOver() {
        if (this.board.boardState() !== 0 || this.board.isfull()) return true;
        else return false;
    }

    displayMessage(num){
        if(num === 0){
            console.log('draw')
        }else if (num ===1){
            console.log('x won')
        }else if (num ===2){
            console.log('o won')
        }
    }
    reset(){
        this.board = new Board();
        this.player = 1;
        this.gameMode = "pvp";
}
}

function main() {
    let game = new Game();
    let board = game.board;
    let guiSquares = document.querySelectorAll(".square");

    guiSquares.forEach((item, index) => {
        item.addEventListener("click", () => {
            let row,col
            if(index<3){
                row = 0
                col = index
            }else if (index > 2 && index < 6){
                row = 1
                col = index%3
            }else if (index > 5 && index<9){
                row = 2
                col = index%6
            }


            if (board.isSquareEmpty(row,col)) 
                game.makeMove(row,col, item);
            

            if (game.isOver()) {
                game.displayMessage(board.boardState())
                game.reset()
            } 
            
        });
    });
}

main()

