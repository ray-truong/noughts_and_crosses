var board = document.querySelector('.game-container');
var resetButton = document.querySelector('.reset-button');
var win = document.querySelector('.winner');
var winlineCreated = false;
var turn = "X";
function boardListener() {
    board.addEventListener('click', startGame);
}
function resetGame() {
    resetButton.addEventListener('click', reset);
}
function main() {
    createSquares();
    boardListener();
    resetGame();
}
function createSquare(i) {
    var square = document.createElement('div');
    square.className = 'square';
    square.id = "square-".concat(i);
    square.textContent = '';
    board.append(square);
}
function createSquares() {
    for (var i = 0; i < 9; i++) {
        createSquare(i);
    }
}
function createWinline(i) {
    var winline = document.createElement('div');
    winline.className = 'winline';
    winline.id = "winline-".concat(i);
    board.append(winline);
}
function winner() {
    var squares = getSquares();
    if (squares[0] === squares[1] && squares[1] === squares[2] && squares[0] !== "") {
        if (!winlineCreated) {
            createWinline(0);
            winlineCreated = true;
        }
        return true;
    }
    else if (squares[3] === squares[4] && squares[4] === squares[5] && squares[4] !== "") {
        if (!winlineCreated) {
            createWinline(1);
            winlineCreated = true;
        }
        return true;
    }
    else if (squares[6] === squares[7] && squares[7] === squares[8] && squares[6] !== "") {
        if (!winlineCreated) {
            createWinline(2);
            winlineCreated = true;
        }
        return true;
    }
    else if (squares[0] === squares[3] && squares[3] === squares[6] && squares[0] !== "") {
        if (!winlineCreated) {
            createWinline(3);
            winlineCreated = true;
        }
        return true;
    }
    else if (squares[1] === squares[4] && squares[4] === squares[7] && squares[1] !== "") {
        if (!winlineCreated) {
            createWinline(4);
            winlineCreated = true;
        }
        return true;
    }
    else if (squares[2] === squares[5] && squares[5] === squares[8] && squares[2] !== "") {
        if (!winlineCreated) {
            createWinline(5);
            winlineCreated = true;
        }
        return true;
    }
    else if (squares[0] === squares[4] && squares[4] === squares[8] && squares[0] !== "") {
        if (!winlineCreated) {
            createWinline(6);
            winlineCreated = true;
        }
        return true;
    }
    else if (squares[2] === squares[4] && squares[4] === squares[6] && squares[2] !== "") {
        if (!winlineCreated) {
            createWinline(7);
            winlineCreated = true;
        }
        return true;
    }
    else {
        return false;
    }
}
function removeWinlines() {
    for (var i = 0; i < 8; i++) {
        var winline = document.getElementById("winline-".concat(i));
        if (winline) {
            winline.remove();
        }
    }
}
function resetSquares() {
    for (var i = 0; i < 9; i++) {
        var square = document.querySelector("#square-".concat(i));
        square.textContent = "";
    }
    boardListener();
    win.style.display = 'none';
}
function getSquares() {
    var squares = [];
    for (var i = 0; i < 9; i++) {
        var square = document.querySelector("#square-".concat(i));
        var squareString = square.textContent;
        if (squareString === null)
            squares.push("");
        else {
            squares.push(squareString);
        }
    }
    return squares;
}
function startGame(e) {
    var target = e.target;
    var squareId = target.id;
    if (!squareId)
        return;
    var square = document.querySelector("#".concat(CSS.escape(squareId)));
    if (!square || square.textContent !== "")
        return;
    square.textContent = turn;
    var hasWon = winner();
    var isDraw = draw();
    if (hasWon) {
        finish();
    }
    else if (isDraw) {
        finish();
    }
    else {
        turn = (turn === "X") ? "O" : "X";
    }
}
function finish() {
    board.removeEventListener('click', startGame);
    if (win === null)
        return;
    var hasWon = winner();
    if (hasWon) {
        win.textContent = turn + " Wins!!!";
        win.style.display = 'block';
    }
    else {
        win.textContent = "Draw";
        win.style.display = 'block';
    }
}
function reset() {
    turn = "X";
    resetSquares();
    removeWinlines();
    winlineCreated = false;
}
function draw() {
    var hasWon = winner();
    var noMoreMoves = boardFull();
    if (!hasWon && noMoreMoves) {
        return true;
    }
    else {
        return false;
    }
}
function boardFull() {
    var squares = getSquares();
    for (var i = 0; i < squares.length; i++) {
        if (squares[i] === "") {
            return false;
        }
    }
    return true;
}
main();
