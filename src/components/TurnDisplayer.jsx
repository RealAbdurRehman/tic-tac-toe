export default function TurnDisplayer({turn, player : {player1, player2}}) {
    if (player1 === "") {
        player1 = "Player 1";
    }
    if (player2 === "") {
        player2 = "Player 2";
    }
    return (
        <div className="turn-display">{turn ? player1 : player2}'s turn</div>
    )
}