import React, { useState, useRef } from 'react';
import './App.css';

const Timer = () => {
  const [duration, setDuration] = useState(60); // Initial duration in seconds
  const [remainingTime, setRemainingTime] = useState(duration);
  const intervalRef = useRef(null);
  const progressBarRef = useRef(null);
  const inputRef = useRef(null);
  const notificationRef = useRef(null);

  const startTimer = () => {
    intervalRef.current = setInterval(() => {
      setRemainingTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(intervalRef.current);
          showNotification();
          return 0;
        }
      });
    }, 1000);
  };

  const pauseTimer = () => {
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    clearInterval(intervalRef.current);
    setRemainingTime(duration);
    hideNotification();
  };

  const handleDurationChange = () => {
    const newDuration = parseInt(inputRef.current.value, 10);
    if (!isNaN(newDuration) && newDuration >= 0) {
      setDuration(newDuration);
      setRemainingTime(newDuration);
      hideNotification();
    }
  };

  const showNotification = () => {
    notificationRef.current.innerText = 'Time is up!';
  };

  const hideNotification = () => {
    notificationRef.current.innerText = '';
  };

  const updateProgressBar = () => {
    const percentage = (remainingTime / duration) * 100;
    progressBarRef.current.style.width = `${percentage}%`;

    // Example of changing background color dynamically
    if (remainingTime < 10) {
      progressBarRef.current.style.backgroundColor = 'red';
    } else {
      progressBarRef.current.style.backgroundColor = 'green';
    }
  };

  // Update progress bar and background color on remainingTime change
  React.useEffect(() => {
    updateProgressBar();
  }, [remainingTime]);

  return (
    <div className="timer">
      <div className="controls">
        <button onClick={startTimer}>Start</button>
        <button onClick={pauseTimer}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
      </div>
      <div className="input-container">
        <input type="number" ref={inputRef} defaultValue={duration} onChange={handleDurationChange} />
      </div>
      <div className="progress-bar">
        <div className="bar" ref={progressBarRef}></div>
      </div>
      <div className="remaining-time">
        {Math.floor(remainingTime / 60)}:{remainingTime % 60 < 10 ? '0' : ''}
        {remainingTime % 60}
      </div>
      <div className="notification" ref={notificationRef}></div>
    </div>
  );
};

export default Timer;
