import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import Background from "../assets/bg.png";
import Location from "../assets/location.png";
import Spotify from "../assets/spotify.png";
import Form from "../assets/form.png";

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

  const [dots, setDots] = useState(".");

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "."));
    }, 1000);

    return () => {
      clearInterval(dotInterval);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      if (Object.keys(calculateTimeLeft()).length === 0) {
        onTimeUp();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [onTimeUp, timeLeft]);

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
      className="flex flex-col justify-center items-center gap-2 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="flex flex-col items-center justify-center">
        {/* LOGO */}
        <img src={Logo} alt="Logo" className="w-64 sm:w-1/4" />

        {/* TITLE */}
        <div className="flex flex-col items-center justify-center uppercase font-bold text-center">
          <h3 className="text-xl sm:text-3xl text-[#2d2c7e]">
            Fiesta de fin de año
          </h3>
          <h1 className="text-4xl sm:text-8xl text-[#2d2c7e]">Terraza Moscú</h1>
          <h2 className="text-lg sm:text-2xl text-[#e53f95]">
            Calentando motores{dots}
          </h2>
        </div>
      </div>

      {/* TIMER */}
      <div
        className="text-4xl sm:text-8xl font-bold text-transparent bg-clip-text"
        id="timer"
        style={{
          backgroundImage: "linear-gradient(to top, #fa6bae, #e94b7e)",
        }}
      >
        {timerComponents.length ? timerComponents : <span>Time's up!</span>}
      </div>

      {/* ADDRESS */}
      <address className="text-sm sm:text-lg text-center text-[#2d2c7e]">
        Avda. Rafael Obligado 6151, Costanera Norte.
      </address>

      {/* LINKS */}
      <div className="flex gap-2 items-center">
        <a
          href="https://www.google.com/maps/search/?api=1&query=Avda.+Rafael+Obligado+6151,+Costanera+Norte"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 p-2 rounded-full bg-[#dee679] hover:bg-[#e53f95] transition active:scale-95"
        >
          <img
            src={Location}
            alt="Location"
            className="w-full h-full object-contain"
          />
        </a>
        <a className="w-14 h-14 p-2 rounded-full bg-[#dee679] hover:bg-[#e53f95] transition active:scale-95">
          <img
            src={Spotify}
            alt="Spotify"
            className="w-full h-full object-contain"
          />
        </a>
        <a className="w-14 h-14 p-2 rounded-full bg-[#dee679] hover:bg-[#e53f95] transition active:scale-95">
          <img src={Form} alt="Form" className="w-full h-full object-contain" />
        </a>
      </div>
    </div>
  );
};

export default Timer;
