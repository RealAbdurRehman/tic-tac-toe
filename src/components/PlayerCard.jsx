import xImage from '../assets/x-yellow.png'
import oImage from '../assets/o-yellow.png'

export default function PlayerCard({playerName, isPlayer1, isDisplayed}) {
    return (
        <div className="player-card">
            {isDisplayed && <div className="marker">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path d="M201.4 374.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 306.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"/>
                </svg>
            </div>}
            <h2>{playerName ? playerName :  isPlayer1 ? "Player 1" : "Player 2"}</h2>
            <div className="player-role">
                <img src={isPlayer1 ? xImage : oImage} alt={isPlayer1 ? "X" : "O"} />
            </div>
            {/* Add Rounds Won */}
        </div>
    )
}