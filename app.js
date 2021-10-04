const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const colors = ['red', 'orange', 'yellow', 'green', 'mediumaquamarine', 'blue', 'purple'];

let time = 0;
let score = 0; // счет игры

startBtn.addEventListener('click', (event) => {
  event.preventDefault(); // отменяем поведение по умолчанию появление решетки
  screens[0].classList.add('up');

});


timeList.addEventListener('click', event => {
  // Делегирование событий
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame();
  }
});

board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});




function startGame() {
  setInterval(decreaseTime, 1000); // 1000 = 1 sec
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    // Значит время вышло 
    finishGame();
  } else {
    let current = --time;
    if (current < 10)
      current = `0${current}`;
    setTime(current);
  }


}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
  timeEl.parentNode.classList.add('hide');
  board.innerHTML = `<h1>Cчёт: <span class="primary">${score}</span> </h1>`;
}

function createRandomCircle() {
  const circle = document.createElement('div');
  const size = getRandomNumber(10, 60);
  // Деструктуризация
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  const color = getRandomNumber(0, colors.length - 1);
  console.log('color: ', color);

  circle.style.background = `linear-gradient(90deg, ${colors[color]} 0%, ${colors[color]} 47%, ${colors[color]} 100%)`;
  circle.style.boxShadow = `0 0 2px ${colors[color]}, 0 0 10px ${colors[color]}`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);

}