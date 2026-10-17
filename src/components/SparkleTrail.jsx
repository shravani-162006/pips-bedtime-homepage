import React, { useEffect, useState, useRef } from 'react';

const SPARKLE_ICONS = ['✦', '✧', '⋆', '✨', '💤', '⭐'];

export default function SparkleTrail({ enabled = true }) {
  const [sparkles, setSparkles] = useState([]);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    if (!enabled) return;

    const handlePointerMove = (e) => {
      const now = performance.now();
      // Throttle sparkle creation to once every 50ms
      if (now - lastTimeRef.current < 50) return;
      lastTimeRef.current = now;

      const clientX = e.clientX ?? (e.touches && e.touches[0]?.clientX);
      const clientY = e.clientY ?? (e.touches && e.touches[0]?.clientY);

      if (clientX === undefined || clientY === undefined) return;

      const id = `${now}-${Math.random()}`;
      const char = SPARKLE_ICONS[Math.floor(Math.random() * SPARKLE_ICONS.length)];
      const colors = ['#FFD166', '#FF8FAB', '#B8C0FF', '#FFF', '#70E4EF'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 10 + 12;

      const newSparkle = {
        id,
        x: clientX + (Math.random() * 12 - 6),
        y: clientY + (Math.random() * 12 - 6),
        char,
        color,
        size
      };

      setSparkles((prev) => [...prev.slice(-16), newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 700);
    };

    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, [enabled]);

  if (!enabled || sparkles.length === 0) return null;

  return (
    <div className="sparkle-trail-container" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="trail-sparkle-item"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            color: s.color,
            fontSize: `${s.size}px`
          }}
        >
          {s.char}
        </span>
      ))}
    </div>
  );
}
