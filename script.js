let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;
let isRunning = false;
let lapCount = 0;

const display = document.getElementById("display");

const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");

const lapsContainer = document.getElementById("laps");


// Format time as HH:MM:SS.CS
function formatTime(time) {

    let milliseconds = Math.floor((time % 1000) / 10);

    let totalSeconds = Math.floor(time / 1000);

    let seconds = totalSeconds % 60;

    let totalMinutes = Math.floor(totalSeconds / 60);

    let minutes = totalMinutes % 60;

    let hours = Math.floor(totalMinutes / 60);


    hours = String(hours).padStart(2, "0");

    minutes = String(minutes).padStart(2, "0");

    seconds = String(seconds).padStart(2, "0");

    milliseconds = String(milliseconds).padStart(2, "0");


    return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}


// Update stopwatch display
function updateDisplay() {

    const currentTime = Date.now();

    elapsedTime = currentTime - startTime;

    display.textContent = formatTime(elapsedTime);
}


// Start Stopwatch
function startStopwatch() {

    if (isRunning) {
        return;
    }

    isRunning = true;

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateDisplay, 10);

    startBtn.disabled = true;
    startBtn.style.opacity = "0.6";

    pauseBtn.disabled = false;
    lapBtn.disabled = false;
}


// Pause Stopwatch
function pauseStopwatch() {

    if (!isRunning) {
        return;
    }

    isRunning = false;

    clearInterval(timerInterval);

    elapsedTime = Date.now() - startTime;

    display.textContent = formatTime(elapsedTime);

    startBtn.disabled = false;
    startBtn.style.opacity = "1";
}


// Reset Stopwatch
function resetStopwatch() {

    clearInterval(timerInterval);

    isRunning = false;

    startTime = 0;

    elapsedTime = 0;

    lapCount = 0;

    display.textContent = "00:00:00.00";

    startBtn.disabled = false;
    startBtn.style.opacity = "1";

    pauseBtn.disabled = false;
    lapBtn.disabled = false;

    lapsContainer.innerHTML = `
        <p class="empty-message">
            No lap times recorded yet
        </p>
    `;
}


// Record Lap
function recordLap() {

    if (!isRunning) {
        return;
    }

    lapCount++;

    const lapItem = document.createElement("div");

    lapItem.classList.add("lap-item");

    lapItem.innerHTML = `
        <span class="lap-number">
            Lap ${lapCount}
        </span>

        <span class="lap-time">
            ${formatTime(elapsedTime)}
        </span>
    `;

    if (lapCount === 1) {
        lapsContainer.innerHTML = "";
    }

    lapsContainer.prepend(lapItem);
}


// Button Events
startBtn.addEventListener("click", startStopwatch);

pauseBtn.addEventListener("click", pauseStopwatch);

lapBtn.addEventListener("click", recordLap);

resetBtn.addEventListener("click", resetStopwatch);
