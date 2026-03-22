import {useState} from 'react';
import StartScreen from "./components/StartScreen.jsx";
import GameScreen from "./components/GameScreen.jsx";

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  function handleStartGame() {
    setGameStarted(true);
  }
  return (
      <div>
        {!gameStarted ? (
            <StartScreen onStart = {handleStartGame} />
        ) : (
              <GameScreen/>
              )}
      </div>
  );
}

export default App;