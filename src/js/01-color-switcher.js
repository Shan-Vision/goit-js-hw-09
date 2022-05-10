const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

const isActive = true;
const DELAY = 1000;
let timerId = 0;

refs.stopBtn.disabled = isActive;
refs.startBtn.addEventListener('click', onStartChangeColor);
refs.stopBtn.addEventListener('click', onStopChangeColor);

function onStartChangeColor() {
  refs.startBtn.disabled = isActive;
  refs.stopBtn.disabled = !isActive;
  timerId = setInterval(changeBackgroundColor, DELAY);
}
function onStopChangeColor() {  
  clearInterval(timerId);
 
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeBackgroundColor() {
  refs.body.style.backgroundColor = getRandomHexColor();
}
