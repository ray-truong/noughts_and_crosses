const goFirst = document.getElementById('go-first');
const goSecond = document.getElementById('go-second');
const alertBox = document.getElementById('custom-alert');

goFirst.addEventListener('click', function(){

    alertBox.style.display = 'none';
    let turn = false;
});

goSecond.addEventListener('click', function(){

    alertBox.style.display = 'none';
    let turn = true;
});