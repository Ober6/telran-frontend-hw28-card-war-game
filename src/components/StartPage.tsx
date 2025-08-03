import {useState} from 'react';

export default function StartPage({saveAndStartGame}: { saveAndStartGame: (name: string) => void }) {
    const [nameInput, setNameInput] = useState('');

    return (
        <div className="startpage-container">
            <h1>Enter your name:</h1>
            <input
                type="text"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Your name"
                autoFocus
            />
            <button onClick={() => saveAndStartGame(nameInput)}>Start Game</button>
        </div>
    );
}