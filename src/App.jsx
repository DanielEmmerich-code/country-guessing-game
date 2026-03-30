import {useEffect, useState} from "react";
import GameOverScreen from "./components/GameOverScreen.jsx";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";

function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answerStatus, setAnswerStatus] = useState(null);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function shuffleArray(array) {
    const copiedArray = [...array];

    for (let i = copiedArray.length - 1; i >= 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));

      [copiedArray[i], copiedArray[randomIndex]] =
          [copiedArray[randomIndex], copiedArray[i]];
    }
    return copiedArray;
  }

  function getAnswerOption(currentCountry, allCountries) {
    const wrongOptions = allCountries
        .filter((country) => country.cca2 !== currentCountry.cca2)
        .map((country) => country.name.common);

    const randomWrongOptions = shuffleArray(wrongOptions).slice(0,3);

    return shuffleArray([currentCountry.name.common, ...randomWrongOptions]);
  }
  useEffect(() => {
    async function fetchCountries() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
            "https://restcountries.com/v3.1/all?fields=name,flags,cca2"
        );
        if(!response.ok) {
          throw new Error("Fehler beim Laden der Länder");
        }
        const data = await response.json();
        const validCountries = data.filter((country) => {
          return country.name?.common && country.flags?.png;
        });
        setCountries(validCountries);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCountries();
  }, []);

  function handleStartGame() {
    setGameStarted(true);
    setScore(0);
    setWrongAnswers(0);
    setCurrentQuestionIndex(0);
    setAnswerStatus(null);
  }

  function handleRestartGame() {
    setGameStarted(false);
    setScore(0);
    setWrongAnswers(0);
    setCurrentQuestionIndex(0);
    setAnswerStatus(null);
  }

  function handleAnswer(selectedAnswer) {
    if(answerStatus !== null) {
      return;
    }
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
      setAnswerStatus("correct");
    } else {
      setWrongAnswers((prevWrongAnswers) => prevWrongAnswers + 1);
      setAnswerStatus("wrong");
    }

    setTimeout(() => {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setAnswerStatus(null);
    },1000);
  }

  if(isLoading) {
    return <p>Länder werden geladen...</p>
  }
  if(error) {
    return <p>Fehler: {error}</p>;
  }
  if(countries.length === 0) {
    return <p>Keine Länder gefunden</p>
  }

  const currentCountry = countries[currentQuestionIndex];

  const currentQuestion = currentCountry ? {
    flag: currentCountry.flags.png,
    correctAnswer: currentCountry.name.common,
    options: getAnswerOption(currentCountry,countries),
  } : null;

  if (gameStarted && wrongAnswers >= 5){
    return (
        <GameOverScreen
          score = {score}
          onRestart = {handleRestartGame}
        />
    );
  }
  if (gameStarted && currentQuestionIndex >= countries.length) {
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
                answerStatus={answerStatus}
            />
        )}
      </div>
  );
}

export default App;