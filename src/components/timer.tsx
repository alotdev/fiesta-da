import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";
import Background from "../assets/bg.png";
import Song from "../assets/song.mp3";

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

    return () => clearInterval(dotInterval);
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
      className="flex flex-col justify-center items-center gap-4 w-full h-full bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {/* PLAYER */}
      <audio
        src={Song}
        autoPlay
        controls
        className="absolute top-4 opacity-0"
      />
      <div
        className="absolute top-4 p-4 bg-[#29b0dd] rounded-full cursor-pointer active:scale-95 transition"
        onClick={() => {
          const audio = document.querySelector("audio");
          if (audio) {
            if (audio.paused) {
              audio.play();
            } else {
              audio.pause();
            }
          }
        }}
      >
        {document.querySelector("audio")?.paused ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24"
            height="24"
            stroke-width="1.5"
          >
            <path d="M7 4v16l13 -8z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24"
            height="24"
            stroke-width="1.5"
          >
            <path d="M6 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
            <path d="M14 5m0 1a1 1 0 0 1 1 -1h2a1 1 0 0 1 1 1v12a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1z"></path>
          </svg>
        )}
      </div>

      {/* LOGO */}
      <img src={Logo} alt="Logo" className="w-64 sm:w-1/4" />

      {/* TITLE */}
      <div className="flex flex-col items-center justify-center uppercase font-bold">
        <h3 className="text-xl sm:text-3xl text-[#2d2c7e]">
          Fiesta de fin de año
        </h3>
        <h1 className="text-4xl sm:text-8xl text-[#2d2c7e]">Terraza Moscú</h1>
        <h2 className="text-lg sm:text-2xl text-[#e53f95]">
          Calentando motores{dots}
        </h2>
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
      <div className="absolute bottom-4 flex flex-col gap-2 items-center">
        <address className="text-sm sm:text-lg text-[#2d2c7e]">
          Avda. Rafael Obligado 6151, Costanera Norte.
        </address>
        <button
          className="flex items-center gap-1 text-sm sm:text-lg px-4 py-2 w-fit bg-[#2d2c7e] text-white rounded hover:bg-[#e53f95] transition active:scale-95"
          onClick={() =>
            window.open(
              "https://www.google.com/maps/search/?api=1&query=Avda.+Rafael+Obligado+6151,+Costanera+Norte",
              "_blank"
            )
          }
        >
          Ver en el mapa
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            width="24"
            height="24"
            stroke-width="1.5"
          >
            <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
            <path d="M14.997 19.317l-1.583 1.583a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 13.657 -5.584"></path>
            <path d="M19 22v.01"></path>
            <path d="M19 19a2.003 2.003 0 0 0 .914 -3.782a1.98 1.98 0 0 0 -2.414 .483"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Timer;
