import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

const BASE_COUNT = 14289;

export default function HitCounter() {
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pip_dreams_counter');
      if (saved) return parseInt(saved, 10);
    }
    return BASE_COUNT;
  });

  const [floatingBonus, setFloatingBonus] = useState([]);
  const [isRolling, setIsRolling] = useState(false);

  // Sync with /api/counter if available
  useEffect(() => {
    let isMounted = true;
    fetch('/api/counter')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && typeof data.count === 'number') {
          setCount(Math.max(data.count, BASE_COUNT));
          localStorage.setItem('pip_dreams_counter', String(Math.max(data.count, BASE_COUNT)));
        }
      })
      .catch(() => {
        // Silently use localStorage fallback
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleDeliverDream = async () => {
    soundFx.playOdometerTick();
    soundFx.playChime('G5', 'musicBox', 0.6);
    setIsRolling(true);

    const newCount = count + 1;
    setCount(newCount);
    localStorage.setItem('pip_dreams_counter', String(newCount));

    // Spawn "+1 Dream!" toast
    const id = Date.now();
    setFloatingBonus((prev) => [...prev, id]);
    setTimeout(() => {
      setFloatingBonus((prev) => prev.filter((item) => item !== id));
    }, 1200);

    setTimeout(() => setIsRolling(false), 300);

    // Attempt to persist to API
    try {
      await fetch('/api/counter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'increment' })
      });
    } catch {
      // Offline fallback succeeded in localStorage
    }
  };

  // Format count into 6 digits with leading zeros
  const digits = String(count).padStart(6, '0').split('');

  return (
    <div className="hit-counter-container">
      <div className="counter-titlebar">
        <span className="counter-icon">📟</span>
        <span className="counter-label">DREAMS DELIVERED ODOMETER</span>
      </div>

      <div className="odometer-deck">
        <div className="odometer-bezel">
          {digits.map((digit, idx) => (
            <div key={idx} className={`odometer-wheel ${isRolling && idx === digits.length - 1 ? 'rolling' : ''}`}>
              <div className="odometer-digit">{digit}</div>
              <div className="odometer-glare"></div>
            </div>
          ))}
        </div>

        <button
          className="retro-btn deliver-dream-btn"
          onClick={handleDeliverDream}
          aria-label="Deliver a dream to advance the odometer"
        >
          Deliver a Dream! 💤 +1
        </button>
      </div>

      {floatingBonus.map((id) => (
        <span key={id} className="floating-odometer-toast">
          ✨ +1 Dream Delivered!
        </span>
      ))}

      <div className="odometer-caption">
        <small>★ Official Midnight Nursery Counter · Verified by Pip</small>
      </div>
    </div>
  );
}
