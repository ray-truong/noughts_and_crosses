const board = document.querySelector('.game-container') as HTMLElement;
const resetButton = document.querySelector('.reset-button') as HTMLElement;
const win = document.querySelector('.winner') as HTMLElement;
let winlineCreated = false;


type Turn = "X" | "O" | ""

let turn: Turn = "X";

function boardListener() :void {
    board.addEventListener('click', startGame);
}
function resetGame() :void {
    resetButton.addEventListener('click', reset);
}

function main(): void {
    createSquares();
    boardListener();
    resetGame();
}

function createSquare(i: number): void {
    const square: HTMLDivElement = document.createElement('div');
    square.className = 'square';
    square.id = `square-${i}`;
    square.textContent = '';
    board.append(square);
}

function createSquares(): void {
    for (let i = 0; i < 9; i++) {
        createSquare(i)
    }
}

function createWinline(i: number): void {
    const winline: HTMLDivElement = document.createElement('div');
    winline.className = 'winline';
    winline.id = `winline-${i}`;
    board.append(winline);
}


function winner(): boolean {
    const squares: Array<string> = getSquares();
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

function removeWinlines(): void {
    for (let i = 0; i < 8; i++) {
        const winline = document.getElementById(`winline-${i}`);
        if (winline) {
            winline.remove();
        }
    }
}


function resetSquares(): void {
    for (let i = 0; i < 9; i++) {
        const square = document.querySelector(`#square-${i}`) as HTMLElement;
        square.textContent = "";
    }
    boardListener();
    win.style.display = 'none';
}

function getSquares(): Array<string> {
    const squares: Array<string> = [];
    for (let i = 0; i < 9; i++) {
        const square = document.querySelector(`#square-${i}`) as HTMLElement;
        const squareString: string | null = square.textContent;
        if (squareString=== null) squares.push("");
        else {
            squares.push(squareString);
        }
    }
    return squares;
}

function startGame(e: Event): void {
    const target = e.target as HTMLElement; 
    const squareId: string | null = target.id;
    if (!squareId) return; 
    const square: HTMLElement | null = document.querySelector(`#${CSS.escape(squareId)}`);
    if (!square || square.textContent !== "") return;
    square.textContent = turn;
    const hasWon: boolean = winner();
    const isDraw: boolean = draw();
    if (hasWon) {
        finish();
    } else if (isDraw) {
        finish();
    } else {
        turn = (turn === "X") ? "O" : "X";
    }
}

function finish(): void {
    board.removeEventListener('click', startGame);
    if (win === null) return;
    const hasWon: boolean = winner();
    if (hasWon) {
        win.textContent = turn + " Wins!!!";
        win.style.display = 'block';
    }
    else {
        win.textContent = "Draw";
        win.style.display = 'block';
    }
}

function reset(): void {
    turn = "X";
    resetSquares();
    removeWinlines();
    winlineCreated = false;
}

function draw(): boolean {
    const hasWon: boolean = winner();
    const noMoreMoves = boardFull();
    if (!hasWon && noMoreMoves) {
        return true;
    }
    else {
        return false;
    }
}

function boardFull(): boolean {
    const squares: Array<string> = getSquares();
    for (let i = 0; i < squares.length; i ++) {
        if (squares[i] === "") {
            return false;
        }
    }
    return true;
}

main()