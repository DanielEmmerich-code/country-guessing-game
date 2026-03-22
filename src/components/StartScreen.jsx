function StartScreen({ onStart }) {
    return (
        <div>
            <h1>Flaggen lernen App</h1>
            <p>Teste dein Wissen</p>

            <button onClick={ onStart }>Spiel starten</button>
        </div>
    )
}
export default StartScreen;