import React from 'react'
import History from './History'
import Settings from './Settings'
import PlayerCard from './PlayerCard'
import ResultWindow from './ResultWindow'
import TurnDisplayer from './TurnDisplayer'
import xImage from '../assets/x-yellow.png'
import oImage from '../assets/o-white.png'

export default function() {
    const [settings, setSettings] = React.useState(
        {
            player1: "Player 1",
            player2: "Player 2"
        }
    )
    const [result, setResult] = React.useState(null);
    const [isXTurn, setIsXTurn] = React.useState(true);
    const [isGameOver, setIsGameOver] = React.useState(false);
    const [showHistory, setShowHistory] = React.useState(false);
    const [gameHistory, setGameHistory] = React.useState(JSON.parse(localStorage.getItem('gameHistory')) || []);
    const [buttons, setButtons] = React.useState([
        {id: 1, isX: false, isO: false, isDisabled: false},
        {id: 2, isX: false, isO: false, isDisabled: false},
        {id: 3, isX: false, isO: false, isDisabled: false},
        {id: 4, isX: false, isO: false, isDisabled: false},
        {id: 5, isX: false, isO: false, isDisabled: false},
        {id: 6, isX: false, isO: false, isDisabled: false},
        {id: 7, isX: false, isO: false, isDisabled: false},
        {id: 8, isX: false, isO: false, isDisabled: false},
        {id: 9, isX: false, isO: false, isDisabled: false}
    ]);
    function handleEvent({target : {name, value}}) {
        setSettings(prevSettings => ({
            ...prevSettings,
            [name]: value
        }))
    }
    function checkWin(buttons, player1, player2) {
        const possibleCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 4, 8],
            [2, 4, 6],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8]
        ]
        for (const pattern of possibleCombinations) {
            const [a, b, c] = pattern;
            if (buttons[a].isX && buttons[b].isX && buttons[c].isX) {
                return `${player1 ? player1 : "Player 1"} takes the victory! Well played!`;
            } 
            if (buttons[a].isO && buttons[b].isO && buttons[c].isO) {
                return `${player2 ? player2 : "Player 2"} won! Nicely played!`;
            }
        }
        const allDisabled = buttons.every(button => button.isDisabled);
        if (allDisabled) {
            return `It’s a draw! Nice game, ${player1 ? player1 : "Player 1"} and ${player2 ? player2 : "Player 2"}!`;
        }
        return null;
    }
    function handleClick(id) {
        if (result || isGameOver) {
            return;
        }
        setButtons(prevButtons => {
            const newButtons = prevButtons.map(button => {
                if (button.id === id && !button.isDisabled) {
                    const updatedButton = {
                        ...button,
                        isX: isXTurn,
                        isO: !isXTurn,
                        isDisabled: true
                    }
                    return updatedButton;
                }
                return button;
            })
            return newButtons;
        })
        setIsXTurn(prevTurn => !prevTurn);
    }
    React.useEffect(() => {
        if (isGameOver) {
            return;
        }
        const winner = checkWin(buttons, settings.player1, settings.player2);
        if (winner) {
            setResult(winner);
            setButtons(prevButtons => prevButtons.map(button => ({...button, isDisabled: true})));
            setIsGameOver(true);
            const newGameHistory = [
                ...gameHistory,
                {
                    player1: settings.player1,
                    player2: settings.player2,
                    winner: winner.includes('draw') ? 'none' : winner.includes(settings.player1) ? settings.player1 : settings.player2
                }
            ];
            setGameHistory(newGameHistory);
            localStorage.setItem('gameHistory', JSON.stringify(newGameHistory));
        }
    }, [buttons, settings.player1, settings.player2, gameHistory])
    function reset() {
        setButtons(prevButtons => prevButtons.map(button => ({
            ...button,
            isX: false,
            isO: false,
            isDisabled: false
        })))
        setResult(null);
        setIsXTurn(true);
        setIsGameOver(false);
    }
    function toggleHistory() {
        setShowHistory(prevHistory => !prevHistory);
    }
    function clearHistory() {
        localStorage.clear();
        setGameHistory([]);
    }
    const buttonElements = buttons.map(button => {
        return (
            <button key={button.id} id={button.id} disabled={button.isDisabled} onClick={() => handleClick(button.id)}>
                {button.isX ? <img src={xImage} alt="X" /> : button.isO ? <img src={oImage} alt="O" /> : ""}
            </button>
        )
    })
    return (
        <>
            <div className="top">
                <h1>Tic-<span>Tac</span>-Toe</h1>
                {!isGameOver && 
                    <button className="reset-btn history-btn btn" onClick={toggleHistory}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
                            <path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/>
                        </svg>
                        {showHistory ? "Hide" : "Show"} History
                    </button>
                }
            </div>
            <section className="game-stats">
                <PlayerCard playerName={settings.player1} isPlayer1={true} isDisplayed={isXTurn} />  
                <section className="main-game">{buttonElements}</section>
                <PlayerCard playerName={settings.player2} isPlayer1={false} isDisplayed={!isXTurn} />
            </section>
            <TurnDisplayer turn={isXTurn} player={settings} />
            <Settings eventHandler={handleEvent} currentSettings={settings} resetFunc={reset} showBtn={!isGameOver} />
            {isGameOver && <ResultWindow content={result} resetFunc={reset} historyToggle={toggleHistory} />}
            {showHistory && <History gameHistory={gameHistory} clearHistory={clearHistory} />}
        </>
    )
}