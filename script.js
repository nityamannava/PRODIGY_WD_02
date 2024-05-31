let startTime, updatedTime, difference, timerInterval;
let isRunning = false;
let laps = [];

const display = document.getElementById('display');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!isRunning) {
        console.log('Starting the stopwatch...');
        isRunning = true;
        startTime = new Date().getTime() - (difference || 0);
        timerInterval = setInterval(update, 10);
    }
}

function pause() {
    if (isRunning) {
        console.log('Pausing the stopwatch...');
        isRunning = false;
        clearInterval(timerInterval);
        difference = new Date().getTime() - startTime;
    }
}

function reset() {
    console.log('Resetting the stopwatch...');
    isRunning = false;
    clearInterval(timerInterval);
    startTime = 0;
    difference = 0;
    display.innerHTML = '00:00:00.00';
    laps = [];
    renderLaps();
}

function recordLap() {
    if (isRunning) {
        console.log('Recording a lap...');
        laps.push(difference);
        renderLaps();
    }
}

function update() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        const lapElement = document.createElement('li');
        const hours = Math.floor(lap / (1000 * 60 * 60));
        const minutes = Math.floor((lap % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((lap % (1000 * 60)) / 1000);
        const milliseconds = Math.floor((lap % 1000) / 10);
        lapElement.innerHTML = `Lap ${index + 1}: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
        lapsContainer.appendChild(lapElement);
    });
}
