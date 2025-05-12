import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './style.css';
import {
	FaStopwatch,
	FaPlayCircle,
	FaStopCircle,
	FaPauseCircle,
} from 'react-icons/fa';

const Stopwatch = () => {
	const [time, setTime] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0,
	});
	const [isActive, setIsActive] = useState(false);

	const timerRef = useRef(null);

	useEffect(() => {
		if (isActive) {
			timerRef.current = setInterval(updateTime, 10);
		} else {
			clearInterval(timerRef.current);
		}
		return () => clearInterval(timerRef.current);
	}, [isActive]);

	const setFormattedTime = (time) => {
		const formattedTime = String(time).padStart(2, '0');
		return formattedTime;
	};

	const updateTime = () => {
		setTime((prevTime) => {
			let { hours, minutes, seconds, milliseconds } = prevTime;
			milliseconds += 1;
			if (milliseconds === 100) {
				milliseconds = 0;
				seconds += 1;
			}
			if (seconds === 60) {
				seconds = 0;
				minutes += 1;
			}
			if (minutes === 60) {
				minutes = 0;
				hours += 1;
			}

			return { hours, minutes, seconds, milliseconds };
		});
	};

	function startTime() {
		if (!isActive) {
			setIsActive(true);
		}
	}

	function pause() {
		setIsActive(false);
	}

	function reset() {
		setIsActive(false);
		setTime({
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 0,
		});
	}

	return (
		<div className="container">
			<FaStopwatch
				style={{ fontSize: '1.5rem', position: 'absolute', top: '-50px' }}
			/>
			<div className="box">
				<p id="timer">{`${setFormattedTime(time.hours)}:${setFormattedTime(
					time.minutes
				)}:${setFormattedTime(time.seconds)}:${setFormattedTime(
					time.milliseconds
				)}`}</p>
			</div>
			<div className="btn">
				<button
					className="green"
					id="green"
					onClick={() => {
						startTime();
					}}
				>
					<FaPlayCircle style={{ fontSize: '1.5rem' }} />
				</button>
				<button
					className="yellow"
					id="yellow"
					onClick={() => {
						pause();
					}}
				>
					<FaPauseCircle style={{ fontSize: '1.5rem' }} />
				</button>
				<button
					className="red"
					id="red"
					onClick={() => {
						reset();
					}}
				>
					<FaStopCircle style={{ fontSize: '1.5rem' }} />
				</button>
			</div>
		</div>
	);
};

export default Stopwatch;
