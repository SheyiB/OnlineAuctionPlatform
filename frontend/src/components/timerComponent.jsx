import React, { useState, useEffect } from 'react';

const TimerComponent = ({ expirationTime }) => {
  const [status, setStatus] = useState('LIVE!');
  const [remainingTime, setRemainingTime] = useState('');

  useEffect(() => {
    // Function to calculate the remaining time
    const calculateRemainingTime = () => {
      const currentTime = new Date().getTime();
      const expirationTimestamp = new Date(expirationTime).getTime();
      const timeDifference = expirationTimestamp - currentTime;
     // console.log(currentTime, expirationTime, timeDifference)

      if (timeDifference <= 0) {
        setStatus('Bid Ended');
        setRemainingTime('');
      } else {
        const seconds = Math.floor((timeDifference / 1000) % 60);
        const minutes = Math.floor((timeDifference / 1000 / 60) % 60);
        const hours = Math.floor(timeDifference / 1000 / 3600);

        setRemainingTime(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
      }
    };

    // Calculate the remaining time immediately when the component mounts
    calculateRemainingTime();

    // Update the remaining time every second
    const timerInterval = setInterval(() => {
      calculateRemainingTime();
    }, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(timerInterval);
  }, [expirationTime]);

  return (
    <div className="auction-timer">
      <h1 className="timer-heading">Time Remaining</h1>
      <h2 className="timer-display">{remainingTime}</h2>
      <h2 className="timer-status">{status}</h2>
    </div>
  );
};

export default TimerComponent;
