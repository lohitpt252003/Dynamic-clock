const hourHand = document.getElementById('hour-hand');
const minuteHand = document.getElementById('minute-hand');
const secondHand = document.getElementById('second-hand');

const hourDisplay = document.getElementById('hour');
const minuteDisplay = document.getElementById('minute');
const secondDisplay = document.getElementById('second');
const ampmDisplay = document.getElementById('ampm');

const alarmInput = document.getElementById('alarm-input');
const stopAlarmButton = document.getElementById('stop-alarm-button');
const setAlarmButton = document.getElementById('set-alarm-button');
const cancelAlarmButton = document.getElementById('cancel-alarm-button');
const messageDisplay = document.getElementById('message');

const timerHoursInput = document.getElementById('timer-hours');
const timerMinutesInput = document.getElementById('timer-minutes');
const timerSecondsInput = document.getElementById('timer-seconds');
const remainingTimeDisplay = document.getElementById('remaining-time');
const cancelTimerButton = document.getElementById('cancel-timer-button');
const setTimerButton = document.getElementById('set-timer-button');

let alarmTime = null;
let alarmTimeout = null;
let timerInterval = null;

function updateClock() {
    const now = new Date();

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hourRotation = (hours % 12) * 30 + (minutes / 2) - 90;
    const minuteRotation = minutes * 6 - 90;
    const secondRotation = seconds * 6 - 90;

    hourHand.style.transform = `rotate(${hourRotation}deg)`;
    minuteHand.style.transform = `rotate(${minuteRotation}deg)`;
    secondHand.style.transform = `rotate(${secondRotation}deg)`;

    hourDisplay.textContent = String(hours).padStart(2, '0');
    minuteDisplay.textContent = String(minutes).padStart(2, '0');
    secondDisplay.textContent = String(seconds).padStart(2, '0');
    ampmDisplay.textContent = hours >= 12 ? 'PM' : 'AM';
}

function checkAlarm() {
    if (alarmTime) {
        const now = new Date();
        if (now.getHours() === alarmTime.hours && now.getMinutes() === alarmTime.minutes) {
            playAlarm();
        }
    }
}

function playAlarm() {
    const alarmSound = new Audio('https://www.soundjay.com/button/beep-07.wav');
    alarmSound.play();
    alert("Alarm ringing!");
}

function setAlarm() {
    const alarmTimeString = alarmInput.value;
    if (alarmTimeString) {
        const [hours, minutes] = alarmTimeString.split(':').map(Number);
        alarmTime = { hours, minutes };
        messageDisplay.textContent = `Alarm set for ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    }
}

function cancelAlarm() {
    alarmTime = null;
    messageDisplay.textContent = "No alarms as of now!";
    clearTimeout(alarmTimeout);
}

function stopAlarm() {
    alarmTime = null;
    clearTimeout(alarmTimeout);
    messageDisplay.textContent = "Alarm stopped!";
}

function setTimer() {
    const hours = parseInt(timerHoursInput.value) || 0;
    const minutes = parseInt(timerMinutesInput.value) || 0;
    const seconds = parseInt(timerSecondsInput.value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
        let remainingSeconds = totalSeconds;

        timerInterval = setInterval(() => {
            remainingSeconds--;

            const hoursLeft = Math.floor(remainingSeconds / 3600);
            const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
            const secondsLeft = remainingSeconds % 60;

            remainingTimeDisplay.textContent = `Remaining Time: ${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                playAlarm();
                alert("Time's up!");
            }
        }, 1000);
    }
}

function cancelTimer() {
    clearInterval(timerInterval);
    remainingTimeDisplay.textContent = "Remaining Time: 00:00:00";
    timerHoursInput.value = '';
    timerMinutesInput.value = '';
    timerSecondsInput.value = '';
}

setAlarmButton.addEventListener('click', setAlarm);
cancelAlarmButton.addEventListener('click', cancelAlarm);
stopAlarmButton.addEventListener('click', stopAlarm);

setTimerButton.addEventListener('click', setTimer);
cancelTimerButton.addEventListener('click', cancelTimer);

setInterval(updateClock, 1000);
setInterval(checkAlarm, 60000);

// Reference to the respective message elements
const alarmMessageDisplay = document.getElementById('alarm-message');
const timerMessageDisplay = document.getElementById('timer-message');

function setAlarm() {
    const alarmTimeString = alarmInput.value;
    if (alarmTimeString) {
        const [hours, minutes] = alarmTimeString.split(':').map(Number);
        alarmTime = { hours, minutes };
        alarmMessageDisplay.textContent = `Alarm set for ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
        alarmMessageDisplay.className = 'message success';
    } else {
        alarmMessageDisplay.textContent = "Invalid time!";
        alarmMessageDisplay.className = 'message error';
    }
}

function cancelAlarm() {
    alarmTime = null;
    alarmMessageDisplay.textContent = "Alarm cancelled.";
    alarmMessageDisplay.className = 'message info';
    clearTimeout(alarmTimeout);
}

function stopAlarm() {
    alarmTime = null;
    clearTimeout(alarmTimeout);
    alarmMessageDisplay.textContent = "Alarm stopped!";
    alarmMessageDisplay.className = 'message info';
}

function setTimer() {
    const hours = parseInt(timerHoursInput.value) || 0;
    const minutes = parseInt(timerMinutesInput.value) || 0;
    const seconds = parseInt(timerSecondsInput.value) || 0;

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds > 0) {
        let remainingSeconds = totalSeconds;

        timerInterval = setInterval(() => {
            remainingSeconds--;

            const hoursLeft = Math.floor(remainingSeconds / 3600);
            const minutesLeft = Math.floor((remainingSeconds % 3600) / 60);
            const secondsLeft = remainingSeconds % 60;

            remainingTimeDisplay.textContent = `Remaining Time: ${String(hoursLeft).padStart(2, '0')}:${String(minutesLeft).padStart(2, '0')}:${String(secondsLeft).padStart(2, '0')}`;

            if (remainingSeconds <= 0) {
                clearInterval(timerInterval);
                playAlarm();
                timerMessageDisplay.textContent = "Time's up!";
                timerMessageDisplay.className = 'message error';
            }
        }, 1000);

        timerMessageDisplay.textContent = "Timer started.";
        timerMessageDisplay.className = 'message success';
    } else {
        timerMessageDisplay.textContent = "Please enter a valid time.";
        timerMessageDisplay.className = 'message error';
    }
}

function cancelTimer() {
    clearInterval(timerInterval);
    remainingTimeDisplay.textContent = "Remaining Time: 00:00:00";
    timerHoursInput.value = '';
    timerMinutesInput.value = '';
    timerSecondsInput.value = '';
    timerMessageDisplay.textContent = "Timer cancelled.";
    timerMessageDisplay.className = 'message info';
}
