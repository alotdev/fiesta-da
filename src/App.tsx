import { useState } from "react";
import Timer from "./components/timer";

function App() {
  const [showTimer, setShowTimer] = useState(true);

  const handleTimeUp = () => {
    setShowTimer(false);
  };

  return (
    <div className="w-full h-screen">
      {showTimer && <Timer onTimeUp={handleTimeUp} />}
      {!showTimer && (
        <div>
          <h1 className="text-4xl text-center mt-8">DA+</h1>
        </div>
      )}
    </div>
  );
}

export default App;
