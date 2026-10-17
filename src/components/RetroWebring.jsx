import React from 'react';
import { soundFx } from '../utils/audio';

export default function RetroWebring() {
  const handleRingClick = (action) => {
    soundFx.playClick();
    alert(`★ Midnight Webring: Hopping to ${action} bedroom site in the cozy web!`);
  };

  return (
    <footer className="retro-footer-section">
      {/* 90s Webring Widget */}
      <div className="webring-widget win95-window">
        <div className="win-titlebar webring-titlebar">
          <span>🌙 THE MIDNIGHT BEDTIME WEBRING #042</span>
        </div>
        <div className="webring-inner">
          <p className="webring-tagline">
            "You are visiting site #42 of the <strong>Midnight Nursery Ring</strong>. A cozy ring of slumbering web pages."
          </p>
          <div className="webring-nav-buttons">
            <button
              className="retro-btn ring-btn"
              onClick={() => handleRingClick('Previous')}
            >
              « Prev Bedtime
            </button>
            <button
              className="retro-btn ring-btn"
              onClick={() => handleRingClick('Random')}
            >
              ★ Random Dream ★
            </button>
            <button
              className="retro-btn ring-btn"
              onClick={() => handleRingClick('Next')}
            >
              Next Bedtime »
            </button>
          </div>
        </div>
      </div>

      {/* Retro 88x31 Nostalgic GIF-Style Badges */}
      <div className="retro-badges-row">
        <div className="badge-88x31 badge-bed">
          <span className="badge-sub">BEST VIEWED</span>
          <span className="badge-main">IN BED 🛏️</span>
        </div>
        <div className="badge-88x31 badge-netscape">
          <span className="badge-sub">NETSCAPE</span>
          <span className="badge-main">NOW! 4.0</span>
        </div>
        <div className="badge-88x31 badge-dreams">
          <span className="badge-sub">100% PURE</span>
          <span className="badge-main">STARDUST ✨</span>
        </div>
        <div className="badge-88x31 badge-silence">
          <span className="badge-sub">ZERO SILENCE</span>
          <span className="badge-main">CHIMES ON ♫</span>
        </div>
        <div className="badge-88x31 badge-hax">
          <span className="badge-sub">haX.baby</span>
          <span className="badge-main">TRACK 1 ★</span>
        </div>
      </div>

      {/* Mandatory Credits & Attributions */}
      <div className="mandatory-credits-block">
        <p className="disclaimer-text">
          ★ <strong>Disclaimer:</strong> This is a creative fan-made portfolio website built for the <strong>haX.baby</strong> "Baby's First Website" Hackathon (Track 1: Pip). Not officially endorsed.
        </p>
        <p className="credits-details">
          <strong>Character Canon:</strong> Pip · Junior Dream Engineer at Midnight Nursery. Official 3D renders from the haX.baby Track 1 creator asset pack. Custom interactive SVG Pip, Web Audio music-box synthesis, and responsive 90s web desktop UI designed with stardust and love.
        </p>
        <p className="fonts-credits">
          <strong>Typography:</strong> Google Fonts (Fredoka, Silkscreen, Quicksand, Caveat). Audio: Pure browser Web Audio API synthesis.
        </p>
        <p className="copyright-year">
          ✦ © 2026 Midnight Nursery · Sleep tight, little dreamers 💤
        </p>
      </div>
    </footer>
  );
}
