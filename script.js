class Board {
    constructor() {
        this.squares = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];

        this.totalMrkdSqr = 0;
    }
    markSqr(row, col, player) {
        this.squares[row][col] = player;
    }

    isSquareEmpty(row, col) {
        return this.squares[row][col] === null;
    }

    boardState() {
        // returns 1 if x/a wins 2 if b/o wins else 0

        // horizontal wins

        for (let i = 0; i < 3; i++) {
            if (
                this.squares[i][0] == this.squares[i][1] &&
                this.squares[i][1] == this.squares[i][2] &&
                this.squares[i][0] !== null
            )
                return this.squares[i][0];
        }

        // vertical wins

        for (let j = 0; j < 3; j++) {
            if (
                this.squares[0][j] == this.squares[1][j] &&
                this.squares[1][j] == this.squares[2][j] &&
                this.squares[0][j] !== null
            )
                return this.squares[0][j];
        }

        // Diagonal wins

        if (
            this.squares[0][0] == this.squares[1][1] &&
            this.squares[1][1] == this.squares[2][2] &&
            this.squares[0][0] !== null
        )
            return this.squares[0][0];

        if (
            this.squares[2][0] == this.squares[1][1] &&
            this.squares[1][1] == this.squares[0][2] &&
            this.squares[2][0] !== null
        )
            return this.squares[2][0];

        return 0;
    }

    isfull() {
        return this.totalMrkdSqr === 9;
    }

    emptySqrs() {
        let empty_squares = [];
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (this.isSquareEmpty(i, j)) {
                    empty_squares.push([i, j]);
                }
            }
        }
        return empty_squares;
    }
}

class Ai {
    constructor() {
        this.player = 1;
        this.level = 0;
    }

    rand(board) {
        // 0 to 9
        let empty_squares = board.emptySqrs();
        return empty_squares[Math.floor(Math.random() * empty_squares.length)];
    }

    eval(board) {
        let move;
        if (this.level === 0) {
            move = this.rand(board);
        }

        return move;
    }
}

class Game {
    constructor() {
        this.board = new Board();
        this.player = 1;
        this.gameMode = "ai"; //pvp and ai
        this.ai = new Ai();
        this.running = true;
    }

    makeMove(row, col) {
        this.board.markSqr(row, col, this.player);
        this.makeFig(row, col);
        this.changeTurn();
        this.board.totalMrkdSqr++;
        this.gameOver();
    }

    changeTurn() {
        this.player = (this.player % 2) + 1;
    }

    changeIntoIndex(row, col) {
        //change this code
        let index;
        if (row === 0 && col === 0) index = 0;
        if (row === 0 && col === 1) index = 1;
        if (row === 0 && col === 2) index = 2;
        if (row === 1 && col === 0) index = 3;
        if (row === 1 && col === 1) index = 4;
        if (row === 1 && col === 2) index = 5;
        if (row === 2 && col === 0) index = 6;
        if (row === 2 && col === 1) index = 7;
        if (row === 2 && col === 2) index = 8;

        return index;
    }

    makeFig(row, col) {
        let index = this.changeIntoIndex(row, col);
        let x_img = document.createElement("img");
        let o_img = document.createElement("img");
        x_img.src = "X.png";
        o_img.src = "O.png";

        let item = document.querySelectorAll(".square")[index];

        if (this.player === 1) item.appendChild(x_img);
        else item.appendChild(o_img);
    }

    isOver() {
        if (this.board.boardState() !== 0 || this.board.isfull()) {
            this.running = false
            return true;
        } else return false;
    }

    displayMessage(num) {
        const body = document.querySelector("body");
        const message = document.createElement("div");
        const messageContainer = document.createElement("section");
        messageContainer.classList.add("messageContainer");
        message.classList.add("message");

        if (num === 0) {
            console.log("draw");
            message.innerText = "Draw";
        } else if (num === 1) {
            message.innerText = "X Won";
            console.log("draw");
        } else if (num === 2) {
            console.log("draw");
            message.innerText = "O Won";
        }

        const playAgain = document.createElement("button");
        playAgain.classList.add("play-again");
        playAgain.innerText = "Play Again";

        message.appendChild(playAgain);
        messageContainer.appendChild(message);

        body.appendChild(messageContainer);
    }
    reset() {
        this.board = new Board();
        this.player = 1;
        this.gameMode = "pvp";

        location.reload();
    }

    gameOver() {
        if (this.isOver()) {
            this.displayMessage(this.board.boardState());
            const btnAgain = document.querySelector(".play-again");
            btnAgain.addEventListener("click", () => {
                this.reset();
            });
        }
    }
}

function main() {
    let game = new Game();
    let board = game.board;
    let ai = game.ai;
    let guiSquares = document.querySelectorAll(".square");

    guiSquares.forEach((item, index) => {
        if (game.gameMode === "ai" && game.player === ai.player) {
            console.log("ai plays at");

            let [row, col] = ai.eval(board);
            console.log(row, col);
            game.makeMove(row, col);
        }

        item.addEventListener("click", () => {
            // console.log(board.emptySqrs());
            console.log(game.player);
            console.log(ai.player);
            let row, col;
            if (index < 3) {
                row = 0;
                col = index;
            } else if (index > 2 && index < 6) {
                row = 1;
                col = index % 3;
            } else if (index > 5 && index < 9) {
                row = 2;
                col = index % 6;
            }

            if (board.isSquareEmpty(row, col)) game.makeMove(row, col);

            if (
                game.gameMode === "ai" &&
                game.player === ai.player &&
                game.running
            ) {
                console.log("ai plays at");

                let [row, col] = ai.eval(board);
                console.log(row, col);
                game.makeMove(row, col);
            }
        });
    });
}

main();
