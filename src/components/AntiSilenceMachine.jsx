import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

export default function AntiSilenceMachine({ isMuted, onUnmuteRequest }) {
  const [isActive, setIsActive] = useState(false);
  const [rainVol, setRainVol] = useState(40);
  const [windVol, setWindVol] = useState(30);
  const [droneVol, setDroneVol] = useState(50);

  const syncAudio = (active, r, w, d) => {
    if (!active) {
      soundFx.stopAllAmbient();
      return;
    }
    soundFx.setAmbient('rain', r / 100);
    soundFx.setAmbient('wind', w / 100);
    soundFx.setAmbient('drone', d / 100);
  };

  const togglePower = () => {
    soundFx.playClick();
    if (isMuted && !isActive) {
      onUnmuteRequest?.();
    }
    const nextState = !isActive;
    setIsActive(nextState);
    syncAudio(nextState, rainVol, windVol, droneVol);
  };

  const handleRain = (e) => {
    const val = Number(e.target.value);
    setRainVol(val);
    if (isActive) soundFx.setAmbient('rain', val / 100);
  };

  const handleWind = (e) => {
    const val = Number(e.target.value);
    setWindVol(val);
    if (isActive) soundFx.setAmbient('wind', val / 100);
  };

  const handleDrone = (e) => {
    const val = Number(e.target.value);
    setDroneVol(val);
    if (isActive) soundFx.setAmbient('drone', val / 100);
  };

  const applyPreset = (r, w, d) => {
    soundFx.playClick();
    if (isMuted && !isActive) {
      onUnmuteRequest?.();
    }
    setRainVol(r);
    setWindVol(w);
    setDroneVol(d);
    setIsActive(true);
    syncAudio(true, r, w, d);
  };

  useEffect(() => {
    if (isMuted && isActive) {
      // If master muted, stop ambient
      soundFx.stopAllAmbient();
    } else if (!isMuted && isActive) {
      syncAudio(true, rainVol, windVol, droneVol);
    }
  }, [isMuted]);

  useEffect(() => {
    return () => soundFx.stopAllAmbient();
  }, []);

  return (
    <div className="anti-silence-container win95-window">
      <div className="win-titlebar anti-silence-titlebar">
        <div className="win-title-left">
          <span>📻</span>
          <span>PIP_ANTI_SILENCE_SLEEP_MACHINE.SYS (HATES SILENCE!)</span>
        </div>
        <div className="win-controls">
          <span className="win-btn">_</span>
          <span className="win-btn">□</span>
          <span className="win-btn">✕</span>
        </div>
      </div>

      <div className="win-content anti-silence-body">
        <div className="anti-silence-intro">
          <div className="pip-warning-pill">
            <span>⚠️ CANON QUIRK: PIP HATES SILENCE!</span>
          </div>
          <p>
            Pip built this generative sound synthesizer so no bedroom is ever left in lonely, eerie quiet.
            Mix real soothing midnight ambient frequencies directly in your browser!
          </p>
        </div>

        <div className="sound-machine-dashboard">
          {/* Main Power & Spectrum */}
          <div className="power-spectrum-col">
            <button
              className={`sound-machine-power-btn ${isActive ? 'power-active' : ''}`}
              onClick={togglePower}
              aria-label={isActive ? "Turn off sound machine" : "Turn on sound machine"}
            >
              <span className="power-icon">{isActive ? '⚡' : '⏻'}</span>
              <span className="power-text">{isActive ? 'ONLINE (NO SILENCE!)' : 'START MACHINE'}</span>
            </button>

            {/* Generative Sound Waves */}
            <div className="sound-waves-stage">
              {[45, 80, 60, 95, 70, 85, 50, 90, 65, 75].map((h, i) => (
                <div
                  key={i}
                  className="wave-line"
                  style={{
                    height: isActive && !isMuted ? `${h}%` : '10%',
                    opacity: isActive && !isMuted ? 1 : 0.25,
                    animation: isActive && !isMuted ? `wavePulse 1.2s infinite ease-in-out ${i * 0.1}s alternate` : 'none'
                  }}
                />
              ))}
            </div>

            {isMuted && isActive && (
              <span className="muted-warning-badge">⚠️ Master audio is MUTED. Unmute in top tray!</span>
            )}
          </div>

          {/* Channels Mix Deck */}
          <div className="channels-mix-col">
            <div className="sound-channel-item">
              <div className="channel-info">
                <span className="channel-icon">🌧️</span>
                <span className="channel-name">MIDNIGHT RAIN:</span>
                <span className="channel-val">{rainVol}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={rainVol}
                onChange={handleRain}
                className="retro-slider channel-slider"
                aria-label="Rain volume"
              />
            </div>

            <div className="sound-channel-item">
              <div className="channel-info">
                <span className="channel-icon">💨</span>
                <span className="channel-name">LAVENDER BREEZE:</span>
                <span className="channel-val">{windVol}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={windVol}
                onChange={handleWind}
                className="retro-slider channel-slider"
                aria-label="Lavender breeze volume"
              />
            </div>

            <div className="sound-channel-item">
              <div className="channel-info">
                <span className="channel-icon">✦</span>
                <span className="channel-name">432Hz STAR DRONE:</span>
                <span className="channel-val">{droneVol}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={droneVol}
                onChange={handleDrone}
                className="retro-slider channel-slider"
                aria-label="Star drone volume"
              />
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="sound-presets-bar">
          <span className="presets-label">★ BEDTIME PRESETS:</span>
          <button className="retro-btn preset-btn" onClick={() => applyPreset(80, 20, 10)}>
            🌧️ Rainstorm
          </button>
          <button className="retro-btn preset-btn" onClick={() => applyPreset(10, 20, 90)}>
            🧘 432Hz Sanctuary
          </button>
          <button className="retro-btn preset-btn" onClick={() => applyPreset(50, 60, 40)}>
            ☁️ Cloud Voyage
          </button>
          <button className="retro-btn preset-btn" onClick={() => applyPreset(0, 0, 0)}>
            ⏹ Silence (Pip frowns!)
          </button>
        </div>
      </div>
    </div>
  );
}
