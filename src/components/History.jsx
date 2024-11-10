export default function History({gameHistory, clearHistory}) {
    const historyElements = gameHistory.map(({player1, player2, winner}, index) => {
        winner = winner ? winner : "The player with no name";
        return (
            <div key={index} className="history-block">
                <h2><span>{player1 ? player1 : "Player 1"}</span> VS <span>{player2 ? player2 : "Player 2"}</span></h2>
                <h3>{winner !== "none" ? `${winner} won!` : "It's a draw!"}</h3>
            </div>
        )
    })
    return (
        <section className="history">
            {historyElements.length === 0 ? (
                <div className="unavailable-container">
                    <h2 className="unavailable-txt">No game history <span>yet!</span></h2>
                    <h3><span>Tip:</span> Start a game and see your history grow!</h3>
                </div>
                
            ) : historyElements}
            {historyElements.length !== 0 && 
                <button className="reset-btn clear-history-btn btn" onClick={clearHistory}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                        <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                    </svg>
                    Delete
                </button>
    
            }
        </section>
    )
}