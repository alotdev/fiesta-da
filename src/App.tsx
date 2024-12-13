import { useEffect, useState } from "react";
import Logo from "./assets/logo.png";
import Background from "./assets/bg.png";
import Location from "./assets/location.png";
import Spotify from "./assets/spotify.png";
import Form from "./assets/form.png";

function App() {
  const calculateTimeLeft = () => {
    const difference = +new Date("2024-12-13T23:00:00Z") - +new Date();
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
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

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
      className="flex flex-col justify-center items-center gap-2 w-full h-dvh bg-cover bg-center"
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

          {timerComponents.length > 0 ? (
            <h2 className="text-lg sm:text-2xl text-[#e53f95]">
              Calentando motores{dots}
            </h2>
          ) : (
            ""
          )}
        </div>
      </div>

      {/* TIMER */}
      <div
        className="text-4xl sm:text-8xl h-fit font-bold text-transparent bg-clip-text"
        id="timer"
        style={{
          backgroundImage: "linear-gradient(to top, #fa6bae, #e94b7e)",
        }}
      >
        <p className="leading-normal">
          {timerComponents.length ? timerComponents : <span>SE PICÓ!</span>}
        </p>
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
        <a
          href="https://open.spotify.com/playlist/4C5onquSSpLTwQrJ4JdqBJ?si=7W41R-MDSRqCDROh44f8mQ&pi=u-kIuQQ7p8RZyF&pt=e3e345b4e43a58a92054d09039c727b2"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 p-2 rounded-full bg-[#dee679] hover:bg-[#e53f95] transition active:scale-95"
        >
          <img
            src={Spotify}
            alt="Spotify"
            className="w-full h-full object-contain"
          />
        </a>
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeKoLe48Fm4dFOxyjryQXj1UYha_b6Z-DY0exT3meJs8LKp_Q/viewform"
          target="_blank"
          rel="noreferrer"
          className="w-14 h-14 p-2 rounded-full bg-[#dee679] hover:bg-[#e53f95] transition active:scale-95"
        >
          <img src={Form} alt="Form" className="w-full h-full object-contain" />
        </a>
        {/* WHEN TIME IS OVER SHOW THIS ICON */}
        {!timerComponents.length && (
            <button
            onClick={() => window.open('/fiesta-da/Premios.pdf', '_blank')}
            className="w-14 h-14 p-2 rounded-full bg-[#dee679] hover:bg-[#e53f95] transition active:scale-95"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#2d2c7e"
              width="40"
              height="40"
            >
              <path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z"></path>
            </svg>
            </button>
        )}
      </div>
    </div>
  );
}

export default App;
