import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

const INGREDIENTS = [
  { id: 'stardust', name: 'Comet Stardust', icon: '🌟', color: '#FFD166', trait: 'Wonder & Sparkles' },
  { id: 'cloud', name: 'Marshmallow Cloud Fluff', icon: '☁️', color: '#E8ECFD', trait: 'Deep Softness' },
  { id: 'lavender', name: 'Lavender Moon-Tea', icon: '🫖', color: '#C084FC', trait: 'Calm Slumber' },
  { id: 'whale', name: 'Cosmic Whale Song', icon: '🐳', color: '#67E8F9', trait: 'Anti-Silence Hum' },
  { id: 'teddy', name: 'Worn Teddy Wool', icon: '🧸', color: '#FBCFE8', trait: 'Pure Comfort' },
  { id: 'feather', name: 'Feather of Shooting Star', icon: '🚀', color: '#FDA4AF', trait: 'Flying Dreams' },
  { id: 'honey', name: 'Wild Sleepy Honey', icon: '🍯', color: '#FBBF24', trait: 'Sweet Thoughts' },
  { id: 'chime', name: 'Wind Chime Shimmer', icon: '🔔', color: '#A7F3D0', trait: 'Soothing Rhythm' }
];

const PRELOADED_DREAMS = [
  {
    id: 'starter-1',
    title: 'The Starlit Whale Voyage',
    category: 'Cosmic Slumber',
    ingredients: ['🌟', '🐳', '☁️'],
    color: '#67E8F9',
    potency: '99.4% Cozy',
    story: 'You drift through violet skies on the back of a glowing moon whale, wrapped in a blanket woven from fluffy clouds.',
    quote: 'Pip tested this in his star hammock — rated 5/5 yawns!'
  }
];

export default function DreamAlchemyLab() {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [brewing, setBrewing] = useState(false);
  const [currentDream, setCurrentDream] = useState(null);
  const [savedDreams, setSavedDreams] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pip_saved_dreams');
      if (saved) {
        try { return JSON.parse(saved); } catch {}
      }
    }
    return PRELOADED_DREAMS;
  });

  const toggleIngredient = (item) => {
    soundFx.playClick();
    if (selectedIngredients.some((i) => i.id === item.id)) {
      setSelectedIngredients((prev) => prev.filter((i) => i.id !== item.id));
    } else {
      if (selectedIngredients.length >= 3) {
        // Replace oldest or cap at 3
        setSelectedIngredients((prev) => [...prev.slice(1), item]);
      } else {
        setSelectedIngredients((prev) => [...prev, item]);
      }
    }
  };

  const handleBrew = () => {
    if (selectedIngredients.length === 0) return;
    setBrewing(true);
    soundFx.playBrewingSound();

    setTimeout(() => {
      // Procedural title generator based on ingredients
      const titles = [
        `The ${selectedIngredients[0].name.split(' ')[0]} Sanctuary of ${selectedIngredients[selectedIngredients.length - 1].name.split(' ')[0]}`,
        `Voyage Over ${selectedIngredients[0].name.split(' ')[0]} Clouds`,
        `The Secret ${selectedIngredients[selectedIngredients.length - 1].name.split(' ')[0]} Lullaby`,
        `Dancing in ${selectedIngredients[0].name.split(' ')[0]} Starlight`
      ];

      const categories = ['Cosmic Snooze', 'Cozy Blanket Flight', 'Sweet Slumber', 'Starry Reverie'];

      const stories = [
        `You float weightlessly through shimmering skies while ${selectedIngredients.map((i) => i.name.toLowerCase()).join(' and ')} gently soothe your mind into deepest rest.`,
        `Wrapped in warmth, you hear the distant chime of the midnight nursery as soft dreams drift across the rooftops like warm honey.`,
        `A gentle breeze carrying notes of lavender and stardust tucks you in safely. Not a single monster can enter this room.`
      ];

      const newDream = {
        id: `dream-${Date.now()}`,
        title: titles[Math.floor(Math.random() * titles.length)],
        category: categories[Math.floor(Math.random() * categories.length)],
        ingredients: selectedIngredients.map((i) => i.icon),
        color: selectedIngredients[0].color,
        potency: `${(98 + Math.random() * 1.9).toFixed(1)}% Cozy`,
        story: stories[Math.floor(Math.random() * stories.length)],
        quote: 'Certified 100% peaceful by Pip (Junior Dream Engineer)!'
      };

      setCurrentDream(newDream);
      setBrewing(false);
    }, 1100);
  };

  const handleSaveDream = () => {
    if (!currentDream) return;
    soundFx.playChime('C6', 'musicBox', 1.0);
    const updated = [currentDream, ...savedDreams.filter((d) => d.id !== currentDream.id)];
    setSavedDreams(updated);
    localStorage.setItem('pip_saved_dreams', JSON.stringify(updated));
  };

  return (
    <div className="dream-alchemy-container win95-window">
      <div className="win-titlebar alchemy-titlebar">
        <div className="win-title-left">
          <span>🧪</span>
          <span>DREAM_ALCHEMIST_LAB_V2.EXE (PROCEDURAL DREAM BREWER)</span>
        </div>
        <div className="win-controls">
          <span className="win-btn">_</span>
          <span className="win-btn">□</span>
          <span className="win-btn">✕</span>
        </div>
      </div>

      <div className="win-content alchemy-content">
        <div className="alchemy-intro">
          <h3>Pip's Dream Alchemy Lab</h3>
          <p>
            Choose up to <strong>3 dream ingredients</strong> from Pip’s Midnight Nursery pantry to brew a custom, one-of-a-kind bedtime dream!
          </p>
        </div>

        <div className="alchemy-workbench-grid">
          {/* Left: Ingredient Pantry */}
          <div className="pantry-panel">
            <span className="panel-sub-label">★ NURSERY PANTRY (SELECT 1 TO 3):</span>
            <div className="ingredients-selector-grid">
              {INGREDIENTS.map((item) => {
                const isSelected = selectedIngredients.some((i) => i.id === item.id);
                return (
                  <button
                    key={item.id}
                    className={`ingredient-card-btn ${isSelected ? 'selected-ingredient' : ''}`}
                    onClick={() => toggleIngredient(item)}
                    style={{
                      borderColor: isSelected ? item.color : '#373f73',
                      boxShadow: isSelected ? `0 0 10px ${item.color}` : 'none'
                    }}
                  >
                    <span className="ingredient-icon">{item.icon}</span>
                    <div className="ingredient-meta">
                      <span className="ingredient-name">{item.name}</span>
                      <small className="ingredient-trait">{item.trait}</small>
                    </div>
                    {isSelected && <span className="ingredient-check">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Center: Glowing Alchemy Flask */}
          <div className="flask-stage">
            <div className={`alchemy-flask-wrapper ${brewing ? 'brewing-agitation' : ''}`}>
              <svg viewBox="0 0 160 220" className="alchemy-flask-svg">
                {/* Cork */}
                <polygon points="65,10 95,10 90,25 70,25" fill="#B45309" stroke="#78350F" strokeWidth="2" />
                {/* Glass Neck */}
                <rect x="68" y="25" width="24" height="40" fill="rgba(255,255,255,0.15)" stroke="#94A3B8" strokeWidth="2.5" />
                {/* Glass Bulb Body */}
                <path
                  d="
                    M 68 65
                    C 40 100, 20 140, 20 170
                    C 20 200, 45 215, 80 215
                    C 115 215, 140 200, 140 170
                    C 140 140, 120 100, 92 65
                    Z
                  "
                  fill="rgba(255,255,255,0.08)"
                  stroke="#94A3B8"
                  strokeWidth="3"
                />

                {/* Swirling Liquid inside Bulb */}
                {selectedIngredients.length > 0 && (
                  <path
                    d="
                      M 30 160
                      Q 80 145 130 160
                      C 135 185, 115 208, 80 208
                      C 45 208, 25 185, 30 160
                      Z
                    "
                    fill={selectedIngredients[0]?.color || '#FFD166'}
                    opacity="0.75"
                    className="flask-liquid"
                    style={{
                      filter: `drop-shadow(0 0 12px ${selectedIngredients[0]?.color || '#FFD166'})`
                    }}
                  />
                )}

                {/* Bubbles when brewing */}
                {brewing && (
                  <g fill="#FFF">
                    <circle cx="65" cy="170" r="4" className="bubble-1" />
                    <circle cx="85" cy="180" r="5" className="bubble-2" />
                    <circle cx="95" cy="165" r="3" className="bubble-3" />
                  </g>
                )}

                {/* Glass reflection glare */}
                <path
                  d="M 35 150 C 35 125, 50 95, 68 75"
                  fill="none"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>

              <div className="flask-ingredient-tags">
                {selectedIngredients.length === 0 ? (
                  <span className="empty-flask-note">Select ingredients to fill flask</span>
                ) : (
                  selectedIngredients.map((i) => (
                    <span key={i.id} className="mini-tag-pill" style={{ borderColor: i.color }}>
                      {i.icon} {i.name.split(' ')[0]}
                    </span>
                  ))
                )}
              </div>
            </div>

            <button
              className={`retro-btn brew-action-btn ${brewing ? 'brewing-pulse' : ''}`}
              onClick={handleBrew}
              disabled={selectedIngredients.length === 0 || brewing}
            >
              {brewing ? '🧪 Brewing Starlight...' : '✨ Brew Custom Dream!'}
            </button>
          </div>

          {/* Right: Dream Result Card */}
          <div className="result-panel">
            <span className="panel-sub-label">★ GENERATED BEDTIME BLUEPRINT:</span>
            {currentDream ? (
              <div className="brewed-dream-card" style={{ borderColor: currentDream.color }}>
                <div className="brewed-header">
                  <span className="brewed-cat">{currentDream.category}</span>
                  <span className="brewed-potency">★ {currentDream.potency}</span>
                </div>
                <h4 className="brewed-title">{currentDream.title}</h4>
                <div className="brewed-icons">
                  {currentDream.ingredients.map((ic, idx) => (
                    <span key={idx} className="brewed-emblem">{ic}</span>
                  ))}
                </div>
                <p className="brewed-story">"{currentDream.story}"</p>
                <div className="brewed-seal">
                  <small>📜 {currentDream.quote}</small>
                </div>

                <button
                  className="retro-btn save-dream-btn"
                  onClick={handleSaveDream}
                >
                  📥 Bottle & Save to Bedside
                </button>
              </div>
            ) : (
              <div className="brewed-placeholder">
                <span className="ph-icon">💤</span>
                <p>Add ingredients and click "Brew Custom Dream" to generate your dream prescription!</p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Drawer: Saved Bedside Bottle Collection */}
        <div className="saved-bedside-drawer">
          <div className="drawer-header">
            <span>🗄️ YOUR BEDSIDE DREAM DRAWER ({savedDreams.length} BOTTLED DREAMS)</span>
            <small>Persisted in your local nightstand memory</small>
          </div>

          <div className="saved-dreams-deck">
            {savedDreams.map((d) => (
              <div key={d.id} className="mini-bottle-item" onClick={() => setCurrentDream(d)}>
                <span className="bottle-art" style={{ color: d.color }}>🧪</span>
                <div className="bottle-info">
                  <span className="bottle-title">{d.title}</span>
                  <small className="bottle-cat">{d.category} · {d.ingredients.join(' ')}</small>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
