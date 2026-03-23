function GameOverScreen({ score, onRestart}) {
    return (
        <div>
            <h2>Spiel vorbei</h2>
            <p>Dein Score: {score}</p>

            <button onClick={onRestart}>
                Zurück zum Menü
            </button>
        </div>
    );
}

export default GameOverScreen;