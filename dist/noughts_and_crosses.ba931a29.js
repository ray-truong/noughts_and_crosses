const board = document.querySelector(".game-container");
const resetButton = document.querySelector(".reset-button");
const win = document.querySelector(".winner");
let winlineCreated = false;
let turn = "X";
function boardListener() {
    board.addEventListener("click", startGame);
}
function resetGame() {
    resetButton.addEventListener("click", reset);
}
function main() {
    createSquares();
    boardListener();
    resetGame();
}
function createSquare(i) {
    const square = document.createElement("div");
    square.className = "square";
    square.id = `square-${i}`;
    square.textContent = "";
    board.append(square);
}
function createSquares() {
    for(let i = 0; i < 9; i++)createSquare(i);
}
function createWinline(i) {
    const winline = document.createElement("div");
    winline.className = "winline";
    winline.id = `winline-${i}`;
    board.append(winline);
}
function winner() {
    const squares = getSquares();
    if (squares[0] === squares[1] && squares[1] === squares[2] && squares[0] !== "") {
        if (!winlineCreated) {
            createWinline(0);
            winlineCreated = true;
        }
        return true;
    } else if (squares[3] === squares[4] && squares[4] === squares[5] && squares[4] !== "") {
        if (!winlineCreated) {
            createWinline(1);
            winlineCreated = true;
        }
        return true;
    } else if (squares[6] === squares[7] && squares[7] === squares[8] && squares[6] !== "") {
        if (!winlineCreated) {
            createWinline(2);
            winlineCreated = true;
        }
        return true;
    } else if (squares[0] === squares[3] && squares[3] === squares[6] && squares[0] !== "") {
        if (!winlineCreated) {
            createWinline(3);
            winlineCreated = true;
        }
        return true;
    } else if (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== "") {
        if (!winlineCreated) {
            createWinline(4);
            winlineCreated = true;
        }
        return true;
    } else if (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== "") {
        if (!winlineCreated) {
            createWinline(5);
            winlineCreated = true;
        }
        return true;
    } else if (squares[0] === squares[4] && squares[4] === squares[8] && squares[0] !== "") {
        if (!winlineCreated) {
            createWinline(6);
            winlineCreated = true;
        }
        return true;
    } else if (squares[2] === squares[4] && squares[4] === squares[6] && squares[2] !== "") {
        if (!winlineCreated) {
            createWinline(7);
            winlineCreated = true;
        }
        return true;
    } else return false;
}
function removeWinlines() {
    for(let i = 0; i < 8; i++){
        const winline = document.getElementById(`winline-${i}`);
        if (winline) winline.remove();
    }
}
function resetSquares() {
    for(let i = 0; i < 9; i++){
        const square = document.querySelector(`#square-${i}`);
        square.textContent = "";
    }
    boardListener();
    win.style.display = "none";
}
function getSquares() {
    const squares = [];
    for(let i = 0; i < 9; i++){
        const square = document.querySelector(`#square-${i}`);
        const squareString = square.textContent;
        if (squareString === null) squares.push("");
        else squares.push(squareString);
    }
    return squares;
}
function startGame(e) {
    const target = e.target;
    const squareId = target.id;
    if (!squareId) return;
    const square = document.querySelector(`#${CSS.escape(squareId)}`);
    if (!square || square.textContent !== "") return;
    square.textContent = turn;
    const hasWon = winner();
    const isDraw = draw();
    if (hasWon) finish();
    else if (isDraw) finish();
    else turn = turn === "X" ? "O" : "X";
}
function finish() {
    board.removeEventListener("click", startGame);
    if (win === null) return;
    const hasWon = winner();
    if (hasWon) {
        win.textContent = turn + " Wins!!!";
        win.style.display = "block";
    } else {
        win.textContent = "Draw";
        win.style.display = "block";
    }
}
function reset() {
    turn = "X";
    resetSquares();
    removeWinlines();
    winlineCreated = false;
}
function draw() {
    const hasWon = winner();
    const noMoreMoves = boardFull();
    if (!hasWon && noMoreMoves) return true;
    else return false;
}
function boardFull() {
    const squares = getSquares();
    for(let i = 0; i < squares.length; i++){
        if (squares[i] === "") return false;
    }
    return true;
}
main();

//# sourceMappingURL=noughts_and_crosses.ba931a29.js.map
