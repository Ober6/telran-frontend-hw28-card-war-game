import './App.css';
import {useState} from "react";
import StartPage from './components/StartPage';
import PlayPage from './components/PlayPage';
import EndPage from './components/EndPage';

import type {Rank, Card} from './utils/constants';
import {ROUND_COUNT} from './utils/constants';
import {generateDeck, shuffle} from './utils/util_functions';
import {Route, Routes, useNavigate} from "react-router-dom";

function App() {
    const navigate = useNavigate();

    const [playerName, setPlayerName] = useState<string>('');
    const [points, setPoints] = useState({player: 0, computer: 0});
    const [currentRound, setCurrentRound] = useState(0);
    const [deck, setDeck] = useState<Card[]>([]);
    const [playerCard, setPlayerCard] = useState<Card | null>(null);
    const [computerCard, setComputerCard] = useState<Card | null>(null);

    const rankValues: Record<Rank, number> = {
        '2': 0, '3': 1, '4': 2, '5': 3, '6': 4, '7': 5,
        '8': 6, '9': 7, '10': 8, 'jack': 9, 'queen': 10, 'king': 11, 'ace': 12
    };

    const resetGame = () => {
        setPoints({player: 0, computer: 0});
        setCurrentRound(0);
        const newDeck = shuffle(generateDeck());
        setDeck(newDeck);
        setPlayerCard(null);
        setComputerCard(null);
    };

    const saveNameAndStartGame = (name: string) => {
        if (name.trim() === '') return;
        setPlayerName(name);
        resetGame();

        navigate('/play');
    };

    const playNextRound = () => {
        if (deck.length < 2) {

            navigate('/end');
            return;
        }

        const playerDraw = deck[0];
        const computerDraw = deck[1];
        setPlayerCard(playerDraw);
        setComputerCard(computerDraw);
        setDeck(deck.slice(2));

        const playerValue = rankValues[playerDraw.rank];
        const computerValue = rankValues[computerDraw.rank];

        if (playerValue > computerValue) {
            setPoints(prev => ({...prev, player: prev.player + 1}));
        } else if (playerValue < computerValue) {
            setPoints(prev => ({...prev, computer: prev.computer + 1}));
        }

        if (currentRound === ROUND_COUNT) {

            navigate('/end');
        } else {
            setCurrentRound(prev => prev + 1);
        }
    };

    const repeat = () => {
        resetGame();

        navigate('/play');
    };

    const playButtonName =
        currentRound === 0
            ? "Start Game"
            : currentRound === ROUND_COUNT
                ? "See Results"
                : "Next Round";


    return (
        <Routes>
            <Route path="/" element={<StartPage saveAndStartGame={saveNameAndStartGame}/>}/>
            <Route
                path="/play"
                element={
                    <PlayPage
                        playerName={playerName}
                        nextRound={playNextRound}
                        points={points}
                        currentRound={currentRound}
                        buttonName={playButtonName}
                        playerCard={playerCard}
                        computerCard={computerCard}
                    />
                }
            />
            <Route
                path="/end"
                element={
                    <EndPage
                        playerName={playerName}
                        points={points}
                        repeat={repeat}
                    />
                }
            />
        </Routes>
    );
}

export default App;
