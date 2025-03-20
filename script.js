const displayTime = document.getElementById('timer');

displayTime.textContent = '00:00:00:000';

let milliseconds = 0,
	seconds = 0,
	minutes = 0,
	hours = 0;
let watch;
let isRunning = false;

function updateTime(unit, length = 2) {
	return String(unit).padStart(length, '0');
}

function timer() {
	milliseconds += 10;

	if (milliseconds >= 1000) {
		milliseconds = 0;
		seconds++;
	}
	if (seconds >= 60) {
		seconds = 0;
		minutes++;
	}
	if (minutes >= 60) {
		minutes = 0;
		hours++;
	}

	displayTime.textContent = `${updateTime(hours)}:${updateTime(
		minutes
	)}:${updateTime(seconds)}:${updateTime(milliseconds, 3)}`;
}

function startTime() {
	if (!isRunning) {
		watch = setInterval(timer, 10);

		isRunning = true;
	}
}

function pause() {
	clearInterval(watch);
	isRunning = false;
}

function reset() {
	clearInterval(watch);
	isRunning = false;
	milliseconds = seconds = minutes = hours = 0;
	displayTime.textContent = '00:00:00:000';
}

document.getElementById('green').addEventListener('click', startTime);
document.getElementById('yellow').addEventListener('click', pause);
document.getElementById('red').addEventListener('click', reset);
