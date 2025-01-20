class Game {
    constructor() {
        this.turn = true;
    }
}

const game = new Game();
const goFirst = document.getElementById('go-first');
const goSecond = document.getElementById('go-second');
const alertBox = document.getElementById('custom-alert');

goFirst.addEventListener('click', function(){

    alertBox.style.display = 'none';
    this.turn = false;
    console.log(this.turn);
});

goSecond.addEventListener('click', function(){

    alertBox.style.display = 'none';
    this.turn = true;
    console.log(this.turn);
});