const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const backgtound = document.querySelector('body');

startButton.addEventListener('click', clickStart);
stopButton.addEventListener('click', clickStop);

let change = null;
stopButton.disabled = true;

function clickStart() {
stopButton.disabled = false;
startButton.disabled = true;
Change = setInterval(bgColorChange, 1000)
}
function clickStop() {
stopButton.disabled = true;
startButton.disabled = false;
    clearInterval(Change);
}
function bgColorChange() {
    backgtound.style.backgroundColor = getRandomHexColor()
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
