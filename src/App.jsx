import { useState } from "react";
import GameOverScreen from "./components/GameOverScreen.jsx";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const questions = [
    {
      flag: "https://flagcdn.com/w320/de.png",
      correctAnswer: "Deutschland",
      options: ["Deutschland", "Frankreich", "Italien", "Belgien"],
    },
    {
      flag: "https://flagcdn.com/w320/fr.png",
      correctAnswer: "Frankreich",
      options: ["Rumänien", "Frankreich", "Niederlande", "Russland"],
    },
    {
      flag: "https://flagcdn.com/w320/jp.png",
      correctAnswer: "Japan",
      options: ["Südkorea", "Bangladesch", "Japan", "China"],
    },
  ];

  const currentQuestion = questions[currentQuestionIndex];

  function handleStartGame() {
    setGameStarted(true);
    setScore(0);
    setWrongAnswers(0);
    setCurrentQuestionIndex(0);
  }

  function handleRestartGame() {
    setGameStarted(false);
    setScore(0);
    setWrongAnswers(0);
    setCurrentQuestionIndex(0);
  }

  function handleAnswer(selectedAnswer) {
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    } else {
      setWrongAnswers((prevWrongAnswers) => prevWrongAnswers + 1);
    }

    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  }
  if (gameStarted && wrongAnswers >= 5){
    return (
        <GameOverScreen
          score = {score}
          onRestart = {handleRestartGame}
        />
    );
  }
  if (gameStarted && currentQuestionIndex >= questions.length) {
    return (
        <GameOverScreen
          score = {score}
          onRestart = {handleRestartGame}
        />
    );
  }

  return (
      <div>
        {!gameStarted ? (
            <StartScreen onStart={handleStartGame} />
        ) : (
            <GameScreen
                question={currentQuestion}
                score={score}
                wrongAnswers={wrongAnswers}
                onAnswer={handleAnswer}
            />
        )}
      </div>
  );
}

export default App;