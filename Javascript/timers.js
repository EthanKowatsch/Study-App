// DOM Element Declarations
const workMinInput = document.getElementById("workMin");
const workSecInput = document.getElementById("workSec");
const restMinInput = document.getElementById("restMin");
const restSecInput = document.getElementById("restSec");
const cyclesInput = document.getElementById("cyclesInput");
const setTimerBtn = document.getElementById("setTimerBtn");
const workMinOutput = document.getElementById("work-timer-min");
const workSecOutput = document.getElementById("work-timer-sec");
const restMinOutput = document.getElementById("rest-timer-min");
const restSecOutput = document.getElementById("rest-timer-sec");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const resetBtn = document.getElementById("resetBtn");
const cyclesOutput = document.getElementById("cycles");

// Timer and cycle variables
let workMin, workSec, restMin, restSec, cycles;
let workTimeRemaining, restTimeRemaining, totalCycles;
let timerInterval;

// Load the sound file
const alarmSound = new Audio("Sound Effects/alarm-clock.mp3");

// Add event listeners for buttons
setTimerBtn.addEventListener("click", setTimer);
startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);
resetBtn.addEventListener("click", resetTimer);

// Function to format time values as "00" if they are less than 10
function formatTime(value) {
  return value < 10 ? `0${value}` : value;
}

// Function to validate input values
function validateInputs() {
  workMin = parseInt(workMinInput.value.trim(), 10);
  workSec = parseInt(workSecInput.value.trim(), 10);
  restMin = parseInt(restMinInput.value.trim(), 10);
  restSec = parseInt(restSecInput.value.trim(), 10);
  cycles = parseInt(cyclesInput.value.trim(), 10);

  if (isNaN(workMin) || isNaN(workSec) || isNaN(restMin) || isNaN(restSec) || isNaN(cycles) || 
      workMin < 0 || workSec < 0 || restMin < 0 || restSec < 0 || cycles <= 0 ||
      workSec >= 60 || restSec >= 60 || (workMin == 0 && workSec == 0 && restMin == 0 && restSec == 0)) {
    alert("Please enter valid time values. Seconds should be between 0 and 59, and cycles should be greater than 0.");
    return false;
  }

  clearInputs();
  return true;
}

// Function to set the timer based on user input
function setTimer() {
  if (!validateInputs()) {
    clearInputs();
    return;
  }

  workMinOutput.textContent = formatTime(workMin);
  workSecOutput.textContent = formatTime(workSec);
  restMinOutput.textContent = formatTime(restMin);
  restSecOutput.textContent = formatTime(restSec);
  cyclesOutput.textContent = cycles;

  totalCycles = cycles;
  workTimeRemaining = workMin * 60 + workSec;
  restTimeRemaining = restMin * 60 + restSec;

  workMinInput.disabled = true;
  workSecInput.disabled = true;
  restMinInput.disabled = true;
  restSecInput.disabled = true;
  cyclesInput.disabled = true;
  setTimerBtn.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = false;
}

// Function to reset both timers and outputs
function resetCycleTimers() {
  workMinOutput.textContent = formatTime(workMin);
  workSecOutput.textContent = formatTime(workSec);
  restMinOutput.textContent = formatTime(restMin);
  restSecOutput.textContent = formatTime(restSec);
}

// Function to play the alarm
function playAlarmSound() {
  alarmSound.play();
  setTimeout(() => {
    alarmSound.pause();
    alarmSound.currentTime = 0;
  }, 3000);
}

// Function to start the work and rest timers
function startCycleTimer() {
    timerInterval = setInterval(() => {
      if (workTimeRemaining > 0) {
        workTimeRemaining--;
        workMinOutput.textContent = formatTime(Math.floor(workTimeRemaining / 60));
        workSecOutput.textContent = formatTime(workTimeRemaining % 60);
        if (workTimeRemaining === 0) {
            playAlarmSound();
        }
      } else if (restTimeRemaining > 0) {
        restTimeRemaining--;
        restMinOutput.textContent = formatTime(Math.floor(restTimeRemaining / 60));
        restSecOutput.textContent = formatTime(restTimeRemaining % 60);
        if (restTimeRemaining === 0) {
            playAlarmSound();
        }
      } else if (totalCycles >= 1) {
        totalCycles--;
        cyclesOutput.textContent = totalCycles;
        resetCycleTimers();
        workTimeRemaining = workMin * 60 + workSec;
        restTimeRemaining = restMin * 60 + restSec;
      } else if (totalCycles === 0) {
        totalCycles--;
        clearInterval(timerInterval);
        alert("All cycles are complete. Please click reset to set a new timer.");
        startBtn.disabled = true;
        stopBtn.disabled = true;
      }
    }, 1000);
  }

// Function to start the timer
function startTimer() {
  if (totalCycles === cycles) {
    totalCycles--;
    cyclesOutput.textContent = totalCycles;
  }

  startBtn.disabled = true;
  stopBtn.disabled = false;

  startCycleTimer();
}

// Function to stop the timer
function stopTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}

// Function to reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  startBtn.disabled = true;
  stopBtn.disabled = true;
  resetBtn.disabled = true;

  workMinInput.disabled = false;
  workSecInput.disabled = false;
  restMinInput.disabled = false;
  restSecInput.disabled = false;
  cyclesInput.disabled = false;
  setTimerBtn.disabled = false;

  workMinOutput.textContent = "00";
  workSecOutput.textContent = "00";
  restMinOutput.textContent = "00";
  restSecOutput.textContent = "00";
  cyclesOutput.textContent = "0";

  clearInputs();
}

// Function to clear all inputs
function clearInputs() {
  workMinInput.value = "";
  workSecInput.value = "";
  restMinInput.value = "";
  restSecInput.value = "";
  cyclesInput.value = "";
}