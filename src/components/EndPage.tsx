type Props = {
    playerName: string;
    points: { player: number; computer: number };
    repeat: () => void;
}

export default function EndPage({playerName, points, repeat}: Props) {
    const {player, computer} = points;
    return (
        <div>
            <h2>Game ended!</h2>
            {
                points.computer > points.player && (
                    <p>You lose!</p>
                )
            }
            {
                points.player > points.computer && (
                    <p>You win!</p>
                )
            }

            <p>Final score: {playerName} - {player}, computer - {computer}</p>
            <button onClick={repeat}>Repeat game</button>
        </div>
    )
}
