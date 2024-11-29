import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import Background from "../assets/bg.png";

interface TimerProps {
  onTimeUp: () => void;
}

const Timer: React.FC<TimerProps> = ({ onTimeUp }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-12-13T20:00:00") - +new Date();
    let timeLeft: { [key: string]: number } = {};

    if (difference > 0) {
      timeLeft = {
        d: Math.floor(difference / (1000 * 60 * 60 * 24)),
        h: Math.floor((difference / (1000 * 60 * 60)) % 24),
        m: Math.floor((difference / 1000 / 60) % 60),
        s: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<{ [key: string]: number }>(
    calculateTimeLeft()
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      if (Object.keys(calculateTimeLeft()).length === 0) {
        onTimeUp();
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]}
        {interval}{" "}
      </span>
    );
  });

  return (
    <div
      className="flex flex-col justify-center items-center w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <img src={Logo} alt="Logo" className="w-64 sm:w-1/3" />
      <div
        className="text-4xl sm:text-8xl font-bold text-transparent bg-clip-text"
        id="timer"
        style={{
          backgroundImage: "linear-gradient(to top, #fa6bae, #e94b7e)",
        }}
      >
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>
    </div>
  );
};

export default Timer;
