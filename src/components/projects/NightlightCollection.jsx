import React, { useState } from 'react';
import { soundFx } from '../../utils/audio';

const LAMPS_DATA = [
  {
    id: 'moon-lantern',
    name: 'Porcelain Moon Lantern',
    subtitle: 'Pip’s Personal Bedside Keeper',
    image: '/assets/pip_dream_lantern.png',
    powerSource: '1 cup of warm starlight',
    glowRadius: '45ft of cozy warding',
    notes: 'Forged from fallen moon dust. Gently banishes cold closet shadows.'
  },
  {
    id: 'star-jar',
    name: 'Firefly Stardust Jar',
    subtitle: 'Captured Shooting Star Fragments',
    icon: '✨',
    powerSource: '2 sleepy yawns / week',
    glowRadius: '25ft flickering constellation',
    notes: 'Six baby stars trapped in antique glass. Hum at 432 Hz when gently shaken.'
  },
  {
    id: 'cloud-nightlight',
    name: 'Sleepy Cloud Lamp',
    subtitle: 'Cotton Mist Ambient Diffuser',
    icon: '☁️',
    powerSource: 'Evaporated lavender tea',
    glowRadius: '35ft diffused mist glow',
    notes: 'Cast in soft-touch silicone. Rains tiny holographic sparkles when tapped.'
  },
  {
    id: 'spore-mushroom',
    name: 'Bioluminescent Spore Cap',
    subtitle: 'Midnight Nursery Flora',
    icon: '🍄',
    powerSource: 'Dew drops & slumber spores',
    glowRadius: '20ft soft earthy radiance',
    notes: 'Grown in the potting shed. Releases gentle dream pollen for restless sleepers.'
  }
];

const COLOR_THEMES = [
  { id: 'gold', name: 'Moonlight Gold', hex: '#FFD166', rgb: '255, 209, 102' },
  { id: 'lavender', name: 'Starlight Lavender', hex: '#B8C0FF', rgb: '184, 192, 255' },
  { id: 'rose', name: 'Rosy Stardust', hex: '#FF8FAB', rgb: '255, 143, 171' },
  { id: 'cyan', name: 'Nebula Mint', hex: '#70E4EF', rgb: '112, 228, 239' }
];

export default function NightlightCollection() {
  const [brightness, setBrightness] = useState(85);
  const [selectedColor, setSelectedColor] = useState(COLOR_THEMES[0]);
  const [lampStates, setLampStates] = useState({
    'moon-lantern': true,
    'star-jar': true,
    'cloud-nightlight': true,
    'spore-mushroom': false
  });
  const [activeLamp, setActiveLamp] = useState(LAMPS_DATA[0]);

  const toggleLamp = (id, e) => {
    e?.stopPropagation();
    soundFx.playClick();
    setLampStates((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleBrightnessChange = (e) => {
    setBrightness(Number(e.target.value));
  };

  const activeGlowAlpha = (brightness / 100) * 0.85;

  return (
    <div
      className="nightlight-collection-container"
      style={{
        '--lamp-glow-color': selectedColor.hex,
        '--lamp-glow-rgb': selectedColor.rgb,
        '--lamp-brightness': `${brightness}%`
      }}
    >
      {/* Control Deck (Retro Dashboard) */}
      <div className="nightlight-control-deck">
        <div className="control-deck-row">
          <div className="control-group">
            <label htmlFor="brightness-slider" className="control-label">
              <span>🔆 AMBIENT GLOW:</span>
              <span className="control-value-badge">{brightness}%</span>
            </label>
            <input
              id="brightness-slider"
              type="range"
              min="10"
              max="100"
              value={brightness}
              onChange={handleBrightnessChange}
              className="retro-slider"
              aria-label="Ambient nightlight brightness"
            />
          </div>

          <div className="control-group">
            <span className="control-label">🎨 SPECTRAL TINT:</span>
            <div className="color-swatch-list">
              {COLOR_THEMES.map((theme) => (
                <button
                  key={theme.id}
                  className={`color-swatch-btn ${selectedColor.id === theme.id ? 'active-swatch' : ''}`}
                  style={{ backgroundColor: theme.hex }}
                  onClick={() => {
                    soundFx.playClick();
                    setSelectedColor(theme);
                  }}
                  title={theme.name}
                  aria-label={`Select ${theme.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lamps Display Grid */}
      <div className="lamps-grid">
        {LAMPS_DATA.map((lamp) => {
          const isOn = lampStates[lamp.id];
          const isSelected = activeLamp.id === lamp.id;

          return (
            <div
              key={lamp.id}
              className={`lamp-card ${isOn ? 'lamp-on' : 'lamp-off'} ${isSelected ? 'lamp-selected' : ''}`}
              onClick={() => setActiveLamp(lamp)}
              style={{
                boxShadow: isOn
                  ? `0 0 ${25 * (brightness / 100)}px rgba(${selectedColor.rgb}, ${activeGlowAlpha})`
                  : 'none'
              }}
            >
              <div className="lamp-card-header">
                <span className="lamp-badge">{isOn ? '● GLOWING' : '○ DORMANT'}</span>
                <button
                  className={`lamp-switch-btn ${isOn ? 'switch-on' : 'switch-off'}`}
                  onClick={(e) => toggleLamp(lamp.id, e)}
                  aria-label={`Toggle ${lamp.name}`}
                >
                  {isOn ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="lamp-visual-stage">
                {lamp.image ? (
                  <div className="lamp-image-wrapper">
                    <img
                      src={lamp.image}
                      alt={lamp.name}
                      className="lamp-img-render"
                      style={{
                        filter: isOn
                          ? `drop-shadow(0 0 ${20 * (brightness / 100)}px ${selectedColor.hex}) brightness(${0.7 + (brightness / 100) * 0.5})`
                          : 'grayscale(60%) brightness(50%)'
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="lamp-icon-display"
                    style={{
                      textShadow: isOn ? `0 0 18px ${selectedColor.hex}` : 'none',
                      opacity: isOn ? 1 : 0.4
                    }}
                  >
                    <span className="lamp-big-emoji">{lamp.icon}</span>
                  </div>
                )}
              </div>

              <div className="lamp-card-body">
                <h4 className="lamp-title">{lamp.name}</h4>
                <p className="lamp-subtitle">{lamp.subtitle}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Lamp Blueprint Specification */}
      <div className="lamp-blueprint-box">
        <div className="blueprint-titlebar">
          <span>📐 BLUEPRINT INSPECTION: {activeLamp.name.toUpperCase()}</span>
          <span>TAG: #NURSERY-LAMP-{activeLamp.id}</span>
        </div>
        <div className="blueprint-body">
          <div className="blueprint-column">
            <p><strong>Power Source:</strong> {activeLamp.powerSource}</p>
            <p><strong>Warding Range:</strong> {activeLamp.glowRadius}</p>
          </div>
          <div className="blueprint-column">
            <p><strong>Pip's Field Notes:</strong></p>
            <p className="blueprint-handwriting">"{activeLamp.notes}"</p>
          </div>
        </div>
      </div>
    </div>
  );
}
