import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../utils/audio';

export default function DreamFlashlight({ isActive, onToggle }) {
  const [pos, setPos] = useState({ x: -500, y: -500 });
  const [isInside, setIsInside] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isActive) return;

    const handlePointerMove = (e) => {
      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX !== undefined && clientY !== undefined) {
        setPos({ x: clientX, y: clientY });
        setIsInside(true);
      }
    };

    const handlePointerLeave = () => {
      setIsInside(false);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('mouseleave', handlePointerLeave);

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mouseleave', handlePointerLeave);
    };
  }, [isActive]);

  return (
    <>
      {isActive && (
        <div
          ref={containerRef}
          className="dream-flashlight-overlay"
          aria-hidden="true"
          style={{
            '--mouse-x': `${pos.x}px`,
            '--mouse-y': `${pos.y}px`
          }}
        >
          {/* Hidden Dream Secrets (Only visible when light shines near them) */}
          <div className="hidden-secret-layer">
            <div className="hidden-constellation c-1" style={{ top: '22%', left: '15%' }}>
              <span className="constellation-svg">✨ ⋆ ✦ ⋆ ✨</span>
              <span className="constellation-name">Constellation: Ursa Sopor (Sleeping Bear)</span>
            </div>

            <div className="hidden-constellation c-2" style={{ top: '65%', left: '75%' }}>
              <span className="constellation-svg">✦ — ⋆ — ✦</span>
              <span className="constellation-name">The Celestial Star Wrench 🔧</span>
            </div>

            <div className="hidden-constellation c-3" style={{ top: '35%', right: '18%' }}>
              <span className="constellation-svg">🍼 · ✧ · ⋆</span>
              <span className="constellation-name">The Cosmic Warm Moonmilk</span>
            </div>

            <div className="hidden-sticker st-1" style={{ bottom: '25%', left: '28%' }}>
              <span>🏷️ "Pip was here with cinnamon star cookies!"</span>
            </div>

            <div className="hidden-sticker st-2" style={{ top: '48%', left: '46%' }}>
              <span>💤 Secret Dream Frequency: 432 Hz</span>
            </div>
          </div>

          {/* Flashlight HUD Badge */}
          <div className="flashlight-hud-badge">
            <span>🔦 DREAM LANTERN ACTIVE</span>
            <small>Move cursor / drag finger to reveal hidden night nursery stars!</small>
            <button
              className="retro-btn exit-flashlight-btn"
              onClick={() => {
                soundFx.playClick();
                onToggle();
              }}
            >
              Exit Lantern Mode ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
}
