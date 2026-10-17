import React from 'react';
import { soundFx } from '../utils/audio';

export default function PipBioWindow({ isDayMode }) {
  return (
    <div className="pip-bio-window win95-window">
      <div className="win-titlebar">
        <div className="win-title-left">
          <span className="win-icon">⭐</span>
          <span className="win-title-text">PERSONNEL_FILE://PIP_JUNIOR_ENGINEER.DAT</span>
        </div>
        <div className="win-controls">
          <button className="win-btn" aria-label="Minimize">_</button>
          <button className="win-btn" aria-label="Maximize">□</button>
          <button className="win-btn" aria-label="Close">✕</button>
        </div>
      </div>

      <div className="win-content bio-layout">
        {/* Left Column: Official Studio Portrait with 90s Badge Frame */}
        <div className="bio-photo-card">
          <div className="photo-inner-frame">
            <img
              src="/assets/pip_portrait.png"
              alt="Pip holding the Dream Nightlight Lantern"
              className="pip-official-portrait-img"
            />
            <div className="photo-caption">
              <span className="photo-stamp">OFFICIAL CANON ID</span>
            </div>
          </div>

          <div className="engineer-badge-pill">
            <span className="badge-star">★</span> JUNIOR DREAM ENGINEER <span className="badge-star">★</span>
          </div>
        </div>

        {/* Right Column: Character Sheet & Personality */}
        <div className="bio-details-col">
          <div className="bio-quote-bubble">
            <p className="bio-tagline">"I build the dreams you fall asleep inside."</p>
          </div>

          <div className="bio-stats-table">
            <div className="stat-row">
              <span className="stat-label">NAME:</span>
              <span className="stat-value highlight-pink">Pip</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">IDENTITY:</span>
              <span className="stat-value">Baby with a smooth round skull face, huge soft eye sockets with cozy glowing pinpricks of light, crooked smile & starry nightcap</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">ASSIGNMENT:</span>
              <span className="stat-value">Midnight Nursery (Cloud Sector 7)</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">PERSONALITY:</span>
              <span className="stat-value">Curious, sleepy, a little clumsy, easily delighted, giggles at everything, <strong>hates silence</strong></span>
            </div>
            <div className="stat-row">
              <span className="stat-label">FAVORITE SNACK:</span>
              <span className="stat-value">Warm moonmilk & cinnamon star biscuits</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">PRIMARY TOOL:</span>
              <span className="stat-value">Golden Star Wrench & Steam Kettle</span>
            </div>
          </div>

          {/* Sleepiness Meter Gauge */}
          <div className="sleepiness-meter-box">
            <div className="sleepiness-header">
              <span>SLEEPINESS INDEX:</span>
              <span className="sleepiness-pct">{isDayMode ? '99% (Deep Nap)' : '87% (Sleepy-Tinkering)'}</span>
            </div>
            <div className="sleepiness-bar-track">
              <div
                className="sleepiness-bar-fill"
                style={{ width: isDayMode ? '99%' : '87%' }}
              >
                <div className="bar-striped-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="win-statusbar">
        <span>STATUS: {isDayMode ? 'Taking a warm daytime nap 💤' : 'Dream Workshop Active (Hates silence!) ♫'}</span>
        <span>SECURITY: Level 1 Baby Access</span>
      </div>
    </div>
  );
}
