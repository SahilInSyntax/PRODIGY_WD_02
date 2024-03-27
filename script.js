let startTime;
let running = false;
let timer;

const display = document.querySelector('.display');
const startPauseBtn = document.getElementById('startPause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

startPauseBtn.addEventListener('click', startPause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function startPause() {
  if (!running) {
    start();
  } else {
    pause();
  }
}

function start() {
  running = true;
  startPauseBtn.textContent = 'Pause';
  startTime = Date.now() - (startTime || 0);
  timer = setInterval(updateDisplay, 10);
}

function pause() {
  running = false;
  startPauseBtn.textContent = 'Resume';
  clearInterval(timer);
}

function reset() {
  running = false;
  clearInterval(timer);
  startPauseBtn.textContent = 'Start';
  display.textContent = '00:00:00.000';
  startTime = null;
  lapList.innerHTML = '';
}

function lap() {
  if (running) {
    const lapTime = formatTime(Date.now() - startTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = lapTime;
    lapList.appendChild(lapItem);
  }
}

function updateDisplay() {
  const elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(milliseconds) {
  const date = new Date(milliseconds);
  return date.toISOString().substr(11, 12);
}
