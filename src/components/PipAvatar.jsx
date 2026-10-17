import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../utils/audio';

export default function PipAvatar({ isDayMode = false, size = 260, interactive = true, className = '' }) {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isGiggling, setIsGiggling] = useState(false);
  const [isBlinking, setIsBlinking] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const headRef = useRef(null);

  // Mouse / Pointer tracking for eye sockets
  useEffect(() => {
    if (!interactive || isDayMode) {
      setPupilOffset({ x: 0, y: 0 });
      return;
    }

    const handlePointerMove = (e) => {
      if (!headRef.current) return;
      const rect = headRef.current.getBoundingClientRect();
      const headCenterX = rect.left + rect.width / 2;
      const headCenterY = rect.top + rect.height / 2;

      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      const dx = clientX - headCenterX;
      const dy = clientY - headCenterY;
      const distance = Math.hypot(dx, dy);

      // Max pupil travel radius inside the socket
      const maxRadius = 9;
      const scale = distance === 0 ? 0 : Math.min(distance / 250, 1);
      const angle = Math.atan2(dy, dx);

      const targetX = Math.cos(angle) * maxRadius * scale;
      const targetY = Math.sin(angle) * maxRadius * scale;

      setPupilOffset({ x: targetX, y: targetY });
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [interactive, isDayMode]);

  // Periodic blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 220);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Handle click / tap on Pip
  const handlePipClick = (e) => {
    soundFx.playGiggle();
    setIsGiggling(true);

    // Spawn cute floating heart/star particle
    const id = Date.now() + Math.random();
    setFloatingHearts((prev) => [...prev, id]);
    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((item) => item !== id));
    }, 1400);

    setTimeout(() => {
      setIsGiggling(false);
    }, 1000);
  };

  return (
    <div
      ref={headRef}
      className={`pip-avatar-container ${className} ${isGiggling ? 'pip-giggling' : ''}`}
      onClick={handlePipClick}
      role="button"
      tabIndex={0}
      aria-label="Pip the Skull Baby - Click me to hear a friendly giggle!"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePipClick(e);
        }
      }}
      style={{
        width: `${size}px`,
        height: `${size * 1.15}px`,
        position: 'relative',
        cursor: 'pointer',
        userSelect: 'none',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* Floating hearts / bubbles on giggle */}
      {floatingHearts.map((id) => (
        <span
          key={id}
          className="pip-float-heart"
          style={{
            position: 'absolute',
            top: '15%',
            left: `${45 + (Math.random() * 20 - 10)}%`,
            pointerEvents: 'none',
            fontSize: '1.4rem',
            animation: 'floatUpAndFade 1.2s ease-out forwards',
            zIndex: 10
          }}
        >
          💖
        </span>
      ))}

      {/* SVG Pip Illustration */}
      <svg
        viewBox="0 0 240 280"
        width="100%"
        height="100%"
        style={{ overflow: 'visible', filter: 'drop-shadow(0 8px 24px rgba(13, 17, 36, 0.35))' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="skullGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFBF2" />
            <stop offset="70%" stopColor="#F5EFE0" />
            <stop offset="100%" stopColor="#E9DFCA" />
          </linearGradient>

          <linearGradient id="nightcapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#5B5EA6" />
            <stop offset="50%" stopColor="#3F427B" />
            <stop offset="100%" stopColor="#2A2B58" />
          </linearGradient>

          <radialGradient id="glowingEyeGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFF2A3" stopOpacity="1" />
            <stop offset="45%" stopColor="#FFD166" stopOpacity="0.8" />
            <stop offset="80%" stopColor="#FF9F1C" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#FF9F1C" stopOpacity="0" />
          </radialGradient>

          <filter id="cozyGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* --- NIGHTCAP TAIL (DROOPS BEHIND) --- */}
        <path
          d="M 160 50 C 205 70, 225 130, 215 175 C 210 190, 195 200, 185 205"
          fill="none"
          stroke="url(#nightcapGradient)"
          strokeWidth="38"
          strokeLinecap="round"
        />

        {/* Pompom on nightcap tip */}
        <circle cx="180" cy="210" r="14" fill="#FFC6D9" stroke="#E06B94" strokeWidth="2.5" />
        <circle cx="180" cy="210" r="8" fill="#FFF0F5" opacity="0.6" />

        {/* Tiny stars on the cap tail */}
        <polygon points="195,115 197,121 203,121 198,124 200,130 195,126 190,130 192,124 187,121 193,121" fill="#FFD166" />
        <polygon points="208,155 209,159 213,159 210,161 211,165 208,162 205,165 206,161 203,159 207,159" fill="#FFD166" />

        {/* --- ROUND SKULL FACE --- */}
        {/* Soft, friendly baby skull contours */}
        <path
          d="
            M 120 40
            C 185 40, 205 95, 205 145
            C 205 185, 180 220, 155 228
            C 142 232, 134 235, 120 235
            C 106 235, 98 232, 85 228
            C 60 220, 35 185, 35 145
            C 35 95, 55 40, 120 40
            Z
          "
          fill="url(#skullGradient)"
          stroke="#38314B"
          strokeWidth="5"
          strokeLinejoin="round"
        />

        {/* Soft Chubby Baby Cheek Curves */}
        <path
          d="M 45 160 C 40 180, 55 205, 80 215"
          fill="none"
          stroke="#D8CCA8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
        />
        <path
          d="M 195 160 C 200 180, 185 205, 160 215"
          fill="none"
          stroke="#D8CCA8"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.4"
        />

        {/* Cheeks: Warm Rosy Blush (Pastel Pink) */}
        <ellipse cx="62" cy="172" rx="15" ry="9" fill="#FFAFCC" opacity="0.45" />
        <ellipse cx="178" cy="172" rx="15" ry="9" fill="#FFAFCC" opacity="0.45" />

        {/* --- EYE SOCKETS --- */}
        {/* Left Socket */}
        <path
          d="M 62 110 C 50 110, 48 135, 54 150 C 60 162, 88 162, 94 150 C 98 135, 94 110, 82 108 C 74 106, 68 110, 62 110 Z"
          fill="#1E192B"
          stroke="#38314B"
          strokeWidth="4"
        />

        {/* Right Socket */}
        <path
          d="M 146 108 C 134 110, 130 135, 134 150 C 140 162, 168 162, 174 150 C 180 135, 178 110, 166 110 C 158 110, 152 106, 146 108 Z"
          fill="#1E192B"
          stroke="#38314B"
          strokeWidth="4"
        />

        {/* Eye Contents: Day mode (sleepy arcs) vs Night mode (glowing pinpricks following mouse) */}
        {isDayMode || isBlinking ? (
          // Sleepy / Blinking happy arcs
          <g stroke="#FFD166" strokeWidth="4.5" strokeLinecap="round" fill="none">
            <path d="M 60 142 Q 74 154 88 142" />
            <path d="M 140 142 Q 154 154 168 142" />
          </g>
        ) : (
          // Glowing Cozy Pinpricks of Light that track cursor
          <g filter="url(#cozyGlow)">
            {/* Left Eye Pinprick */}
            <circle
              cx={74 + pupilOffset.x}
              cy={136 + pupilOffset.y}
              r="7"
              fill="url(#glowingEyeGlow)"
            />
            <circle
              cx={74 + pupilOffset.x}
              cy={136 + pupilOffset.y}
              r="3.5"
              fill="#FFFFFF"
            />
            {/* Soft ambient inner socket star glint */}
            <circle
              cx={70 + pupilOffset.x * 0.5}
              cy={132 + pupilOffset.y * 0.5}
              r="1.8"
              fill="#FFFBEA"
              opacity="0.85"
            />

            {/* Right Eye Pinprick */}
            <circle
              cx={154 + pupilOffset.x}
              cy={136 + pupilOffset.y}
              r="7"
              fill="url(#glowingEyeGlow)"
            />
            <circle
              cx={154 + pupilOffset.x}
              cy={136 + pupilOffset.y}
              r="3.5"
              fill="#FFFFFF"
            />
            <circle
              cx={150 + pupilOffset.x * 0.5}
              cy={132 + pupilOffset.y * 0.5}
              r="1.8"
              fill="#FFFBEA"
              opacity="0.85"
            />
          </g>
        )}

        {/* --- TINY HEART-SHAPED NOSE CAVITY --- */}
        <path
          d="M 115 168 C 115 164, 118 162, 120 165 C 122 162, 125 164, 125 168 C 125 172, 120 176, 120 176 C 120 176, 115 172, 115 168 Z"
          fill="#38314B"
        />

        {/* --- TINY CROOKED SMILE --- */}
        {isGiggling ? (
          // Wide joyful giggle smile
          <g>
            <path
              d="M 98 190 Q 120 216 142 190 Q 120 200 98 190 Z"
              fill="#FF8FAB"
              stroke="#38314B"
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            {/* Cute two baby teeth lines */}
            <line x1="114" y1="193" x2="114" y2="199" stroke="#38314B" strokeWidth="2" />
            <line x1="126" y1="193" x2="126" y2="199" stroke="#38314B" strokeWidth="2" />
          </g>
        ) : (
          // Sweet tiny crooked smile
          <g>
            <path
              d="M 102 194 Q 112 196 122 198 Q 134 200 138 193"
              fill="none"
              stroke="#38314B"
              strokeWidth="4"
              strokeLinecap="round"
            />
            {/* Dimple on the right cheek */}
            <path d="M 139 190 Q 143 194 140 197" fill="none" stroke="#38314B" strokeWidth="2.5" strokeLinecap="round" />
            {/* Little stitched smile notch marks (friendly skeleton detail) */}
            <line x1="110" y1="192" x2="111" y2="198" stroke="#38314B" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="121" y1="194" x2="122" y2="201" stroke="#38314B" strokeWidth="2.2" strokeLinecap="round" />
            <line x1="131" y1="194" x2="132" y2="200" stroke="#38314B" strokeWidth="2.2" strokeLinecap="round" />
          </g>
        )}

        {/* --- BEDTIME NIGHTCAP FRONT --- */}
        {/* Soft cap brim resting over forehead */}
        <path
          d="
            M 38 78
            C 38 78, 65 30, 120 28
            C 175 28, 202 78, 202 78
            C 180 62, 140 55, 120 56
            C 100 55, 60 62, 38 78
            Z
          "
          fill="url(#nightcapGradient)"
          stroke="#38314B"
          strokeWidth="4"
          strokeLinejoin="round"
        />

        {/* Nightcap cuff / rim trim */}
        <path
          d="
            M 34 76
            C 60 60, 100 54, 120 55
            C 140 54, 180 60, 206 76
            C 190 92, 145 76, 120 78
            C 95 76, 50 92, 34 76
            Z
          "
          fill="#FFF9E6"
          stroke="#38314B"
          strokeWidth="3.5"
        />

        {/* Stars on the cap front */}
        <polygon points="90,44 92,49 98,49 93,52 95,57 90,54 85,57 87,52 82,49 88,49" fill="#FFD166" />
        <polygon points="145,40 147,45 153,45 148,48 150,53 145,50 140,53 142,48 137,45 143,45" fill="#FFD166" />
        <polygon points="120,34 121,37 125,37 122,39 123,43 120,40 117,43 118,39 115,37 119,37" fill="#FFD166" />

        {/* --- PINK RIBBON / LITTLE BOW ON THE NIGHTCAP --- */}
        <g transform="translate(162, 60)">
          {/* Left loop */}
          <path d="M 0 0 C -14 -12, -22 6, 0 4 Z" fill="#FF8FAB" stroke="#C94A75" strokeWidth="2.5" />
          {/* Right loop */}
          <path d="M 0 0 C 14 -12, 22 6, 0 4 Z" fill="#FF8FAB" stroke="#C94A75" strokeWidth="2.5" />
          {/* Center knot */}
          <circle cx="0" cy="1" r="5" fill="#FFB3C6" stroke="#C94A75" strokeWidth="2" />
          {/* Ribbon tails */}
          <path d="M -2 4 C -6 14, -10 20, -12 24" fill="none" stroke="#FF8FAB" strokeWidth="3" strokeLinecap="round" />
          <path d="M 2 4 C 6 14, 10 20, 12 24" fill="none" stroke="#FF8FAB" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>

      {/* Floating tooltip clue on hover */}
      <div className="pip-speech-bubble-tag">
        {isDayMode ? "zZz... napping..." : "Click to hear me giggle! ✨"}
      </div>
    </div>
  );
}
