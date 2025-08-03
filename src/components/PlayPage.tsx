import type {JSX} from "react";
import type {Card} from "../utils/constants.ts";

type Props = {
    playerName: string;
    nextRound: () => void;
    points: { player: number; computer: number };
    currentRound: number;
    buttonName: string;
    playerCard: Card | null;
    computerCard: Card | null;
};

function displayCard(card: Card | null): JSX.Element {
    if (!card) return <img src="images/cards/back.png" alt="Card back" width={70}/>;

    const fileName = `${card.rank}_of_${card.suit}.png`;
    const src = `images/cards/${fileName}`;

    return <img src={src} alt={`${card.rank} of ${card.suit}`} width={70}/>;
}

export default function PlayPage({
                                     playerName,
                                     nextRound,
                                     points,
                                     currentRound,
                                     buttonName,
                                     playerCard,
                                     computerCard
                                 }: Props) {
    return (
        <div>
            <h2>Welcome, {playerName}</h2>
            <p>Round: {currentRound === 0 ? 'Ready' : currentRound}</p>
            <p>Score: You - {points.player}, Computer - {points.computer}</p>

            <div style={{display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '1rem'}}>
                <div>Your card: {displayCard(playerCard)}</div>
                <div>Computer card: {displayCard(computerCard)}</div>
            </div>

            <button onClick={nextRound}>{buttonName}</button>
        </div>
    );
}
