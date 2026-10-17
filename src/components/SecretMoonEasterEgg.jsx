import React, { useState } from 'react';
import { soundFx } from '../utils/audio';

export default function SecretMoonEasterEgg({ onUnlockSecret }) {
  const [clickCount, setClickCount] = useState(0);
  const [isWobbling, setIsWobbling] = useState(false);

  const handleMoonClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    setIsWobbling(true);

    if (nextCount === 1) {
      soundFx.playChime('C5', 'glass', 0.5);
    } else if (nextCount === 2) {
      soundFx.playChime('G5', 'glass', 0.6);
    } else if (nextCount >= 3) {
      soundFx.playSecretFanfare();
      onUnlockSecret();
      setClickCount(0);
    }

    setTimeout(() => setIsWobbling(false), 400);
  };

  return (
    <div className="secret-moon-assembly">
      <button
        className={`secret-moon-button ${isWobbling ? 'moon-wobble' : ''}`}
        onClick={handleMoonClick}
        title="The crescent moon looks sleepy... (What happens if you tap it 3 times?)"
        aria-label="Crescent Moon Easter Egg - tap 3 times for a secret"
      >
        <span className="moon-symbol">🌙</span>
        <span className="moon-pulsing-clue">✦</span>
      </button>

      {clickCount > 0 && clickCount < 3 && (
        <span className="moon-clue-bubble">
          {clickCount === 1 ? 'zZz... (1/3)' : 'Waking up! (2/3)'}
        </span>
      )}
    </div>
  );
}
