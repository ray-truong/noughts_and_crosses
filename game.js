var board = document.querySelector('.game-container');
function main() {
    createSquare();
}
function createSquare() {
    var square = document.createElement('div');
    square.className = 'square';
    square.textContent = 'X';
    board.append(square);
}
main();
