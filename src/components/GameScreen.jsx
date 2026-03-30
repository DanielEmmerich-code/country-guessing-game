function GameScreen({ question, score, wrongAnswers, onAnswer, answerStatus}) {
    if (!question) {
        return <p>Frage wird geladen...</p>
    }

    return (
        <div>
            <h2>Flaggen-Quiz</h2>

            <p>Richtig: {score}</p>
            <p>Falsch: {wrongAnswers}</p>

            <img src={question.flag} alt="Flagge" width="500" />

            <h3>Welche Flagge ist das?</h3>

            {question.options.map((option) => (
                <button
                    key={option}
                    onClick={() => onAnswer(option)}
                    disabled={answerStatus !== null}
                >
                    {option}
                </button>
            ))}
            {answerStatus === "correct" && <p>Richtig</p>}
            {answerStatus === "wrong" && <p>Falsch</p>}
        </div>
    );
}

export default GameScreen;