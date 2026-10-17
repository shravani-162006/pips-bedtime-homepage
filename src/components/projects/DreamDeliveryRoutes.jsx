import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../../utils/audio';

const CHECKPOINTS = [
  { progress: 5, name: 'Midnight Nursery Launchpad', desc: 'Loaded 40 flasks of starry lullabies & checked windsock.', status: 'COMPLETED' },
  { progress: 35, name: 'Whispering Chimney Tops', desc: 'Dispersed 14 lavender cloud puffs down brick fireplaces.', status: 'DELIVERED' },
  { progress: 70, name: 'Starlight Lighthouse', desc: 'Refueled cloud generator with fresh moonbeams.', status: 'INSPECTION' },
  { progress: 98, name: 'Slumber Valley Cribs', desc: 'Tucked in sleepy heads. All nightlights humming soft.', status: 'ALL SLEEPING' }
];

export default function DreamDeliveryRoutes() {
  const [progress, setProgress] = useState(15);
  const [isAutoFlying, setIsAutoFlying] = useState(false);
  const animFrameRef = useRef(null);

  // SVG Flight path math: Map a curve from (50, 160) -> (180, 70) -> (320, 150) -> (480, 60) -> (600, 130)
  // We can calculate Pip's X, Y coordinates along a cubic/quadratic bezier or multi-segment path
  const getPositionOnRoute = (p) => {
    // p is 0 to 100
    const t = Math.max(0, Math.min(100, p)) / 100;

    // 4 bezier waypoints
    const p0 = { x: 50, y: 160 };
    const p1 = { x: 190, y: 50 };
    const p2 = { x: 380, y: 180 };
    const p3 = { x: 580, y: 90 };

    // Cubic bezier: B(t) = (1-t)^3 * p0 + 3(1-t)^2*t * p1 + 3(1-t)*t^2 * p2 + t^3 * p3
    const mt = 1 - t;
    const x = mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x;
    const y = mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y;

    return { x, y };
  };

  const currentPos = getPositionOnRoute(progress);

  // Auto flight animation
  useEffect(() => {
    if (!isAutoFlying) return;

    let lastTime = performance.now();
    const flightLoop = (now) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      setProgress((prev) => {
        const next = prev + dt * 18; // ~5.5s full route
        if (next >= 100) {
          setIsAutoFlying(false);
          soundFx.playChime('C6', 'musicBox', 1.0);
          return 100;
        }
        return next;
      });

      animFrameRef.current = requestAnimationFrame(flightLoop);
    };

    animFrameRef.current = requestAnimationFrame(flightLoop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [isAutoFlying]);

  const toggleAutoFlight = () => {
    soundFx.playClick();
    if (isAutoFlying) {
      setIsAutoFlying(false);
    } else {
      if (progress >= 100) setProgress(0);
      setIsAutoFlying(true);
    }
  };

  const handleSliderChange = (e) => {
    setIsAutoFlying(false);
    setProgress(Number(e.target.value));
  };

  // Find active or nearest checkpoint
  const activeCheckpoint = CHECKPOINTS.reduce((prev, curr) => {
    return Math.abs(curr.progress - progress) < Math.abs(prev.progress - progress) ? curr : prev;
  });

  return (
    <div className="dream-delivery-container">
      {/* Route Status Deck */}
      <div className="delivery-status-deck">
        <div className="status-metrics">
          <div className="metric-badge">
            <span className="metric-label">ROUTE STATUS</span>
            <span className="metric-value">{progress >= 95 ? '★ MISSION COMPLETE' : isAutoFlying ? '✈ IN FLIGHT' : '● ON PATROL'}</span>
          </div>
          <div className="metric-badge">
            <span className="metric-label">DELIVERED</span>
            <span className="metric-value">{Math.round((progress / 100) * 48)} / 48 FLASKS</span>
          </div>
          <div className="metric-badge">
            <span className="metric-label">ALTITUDE</span>
            <span className="metric-value">{Math.round(240 - currentPos.y)} METERS</span>
          </div>
        </div>

        <div className="delivery-controls">
          <button
            className={`retro-btn ${isAutoFlying ? 'flying-pulse' : ''}`}
            onClick={toggleAutoFlight}
            aria-label={isAutoFlying ? "Pause delivery flight" : "Launch delivery flight"}
          >
            {isAutoFlying ? '⏸ Pause Flight' : (progress >= 100 ? '↺ Rerun Flight' : '🚀 Launch Flight')}
          </button>
        </div>
      </div>

      {/* SVG Interactive Map */}
      <div className="delivery-map-canvas-wrapper">
        <svg
          viewBox="0 0 640 220"
          className="delivery-map-svg"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0B0F2A" />
              <stop offset="60%" stopColor="#1C2145" />
              <stop offset="100%" stopColor="#2E3466" />
            </linearGradient>

            <pattern id="starGrid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1" fill="#FFF9DE" opacity="0.4" />
              <circle cx="45" cy="35" r="1.5" fill="#FFD166" opacity="0.6" />
              <circle cx="28" cy="50" r="0.8" fill="#FFF" opacity="0.3" />
            </pattern>
          </defs>

          {/* Night Sky & Starfield */}
          <rect width="640" height="220" fill="url(#skyGrad)" rx="8" />
          <rect width="640" height="220" fill="url(#starGrid)" opacity="0.8" />

          {/* Distant Slumber Town Silhouette & Chimneys */}
          <path
            d="
              M 0 220
              L 0 170
              L 35 155 L 70 170
              L 90 170 L 90 145 L 105 145 L 105 170
              L 140 170 L 165 150 L 190 170
              L 220 170 L 220 135 L 235 135 L 235 170
              L 270 170 L 295 155 L 320 170
              L 350 170 L 365 140 L 380 140 L 380 170
              L 410 170 L 440 150 L 470 170
              L 500 170 L 515 130 L 530 130 L 530 170
              L 560 170 L 590 152 L 620 170
              L 640 170 L 640 220
              Z
            "
            fill="#121631"
          />

          {/* Chimney Smoke / Lavender Dream Puffs */}
          <g fill="#B8C0FF" opacity="0.35">
            <ellipse cx="98" cy="132" rx="10" ry="6" />
            <ellipse cx="102" cy="118" rx="14" ry="8" />
            <ellipse cx="228" cy="122" rx="12" ry="7" />
            <ellipse cx="522" cy="116" rx="14" ry="8" />
          </g>

          {/* Flight Path Curve (Dashed line) */}
          <path
            d="M 50 160 C 190 50, 380 180, 580 90"
            fill="none"
            stroke="#4D5896"
            strokeWidth="3"
            strokeDasharray="6 6"
          />

          {/* Active Flight Progress Trail */}
          <path
            d="M 50 160 C 190 50, 380 180, 580 90"
            fill="none"
            stroke="#FFD166"
            strokeWidth="3.5"
            strokeDasharray="600"
            strokeDashoffset={600 - (600 * (progress / 100))}
            style={{ filter: 'drop-shadow(0 0 6px #FFD166)' }}
          />

          {/* Checkpoint Markers */}
          {CHECKPOINTS.map((cp, idx) => {
            const pos = getPositionOnRoute(cp.progress);
            const isReached = progress >= cp.progress;
            return (
              <g
                key={idx}
                transform={`translate(${pos.x}, ${pos.y})`}
                onClick={() => {
                  soundFx.playClick();
                  setProgress(cp.progress);
                }}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  r={isReached ? "9" : "7"}
                  fill={isReached ? "#FF8FAB" : "#2E3466"}
                  stroke={isReached ? "#FFF" : "#747EA8"}
                  strokeWidth="2.5"
                />
                <circle r="3.5" fill={isReached ? "#FFF" : "#B8C0FF"} />
                <text
                  y="-14"
                  textAnchor="middle"
                  fill="#FFF"
                  fontSize="9.5"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                  style={{ textShadow: '0 2px 4px #000' }}
                >
                  #{idx + 1}
                </text>
              </g>
            );
          })}

          {/* PIP FLOATING ON A CLOUD AVATAR */}
          <g
            transform={`translate(${currentPos.x - 28}, ${currentPos.y - 32})`}
            style={{
              transition: isAutoFlying ? 'none' : 'transform 0.1s ease',
              filter: 'drop-shadow(0 6px 12px rgba(255, 209, 102, 0.4))'
            }}
          >
            {/* Soft fluffy dream cloud */}
            <path
              d="
                M 12 40
                C 6 40, 2 34, 4 28
                C 5 22, 12 18, 18 20
                C 22 12, 34 10, 42 16
                C 48 12, 58 14, 60 22
                C 66 24, 68 32, 64 38
                C 60 42, 54 42, 50 42
                Z
              "
              fill="#F4F2FF"
              stroke="#D2CBFC"
              strokeWidth="2"
            />
            {/* Pip skull peeking above cloud */}
            <circle cx="36" cy="16" r="12" fill="#FFF9E6" stroke="#38314B" strokeWidth="2" />
            {/* Nightcap */}
            <path d="M 28 10 Q 36 2 44 10 Z" fill="#5B5EA6" stroke="#38314B" strokeWidth="1.5" />
            <circle cx="44" cy="10" r="2.5" fill="#FFC6D9" />
            {/* Glowing pinprick eyes */}
            <circle cx="32" cy="16" r="2" fill="#1E192B" />
            <circle cx="32" cy="16" r="0.8" fill="#FFD166" />
            <circle cx="40" cy="16" r="2" fill="#1E192B" />
            <circle cx="40" cy="16" r="0.8" fill="#FFD166" />
            {/* Smile */}
            <path d="M 33 21 Q 36 24 39 21" fill="none" stroke="#38314B" strokeWidth="1" strokeLinecap="round" />
          </g>
        </svg>
      </div>

      {/* Flight Scrubber Slider */}
      <div className="scrubber-wrapper">
        <label htmlFor="route-scrubber" className="scrubber-label">
          <span>FLIGHT SCRUBBER:</span>
          <span>{Math.round(progress)}% of delivery route traversed</span>
        </label>
        <input
          id="route-scrubber"
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSliderChange}
          className="retro-slider route-slider"
          aria-label="Route scrub progress"
        />
      </div>

      {/* Checkpoint Detail Card */}
      <div className="checkpoint-log-card">
        <div className="log-header">
          <span className="log-tag">★ FLIGHT LOG ENTRY:</span>
          <span className="log-station">{activeCheckpoint.name}</span>
          <span className="log-status-pill">{activeCheckpoint.status}</span>
        </div>
        <p className="log-desc">"{activeCheckpoint.desc}"</p>
      </div>
    </div>
  );
}
