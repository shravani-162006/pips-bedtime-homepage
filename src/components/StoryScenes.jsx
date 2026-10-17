import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../utils/audio';

const SCENES_DATA = [
  {
    id: 1,
    title: 'Act I: The Cold Silence',
    subtitle: 'Midnight Nursery, 11:42 PM',
    badge: 'Beginning',
    icon: '🕰️',
    body: 'The brass nursery clock ticked too loudly. To Pip, absolute silence didn’t feel peaceful — it felt hollow and lonely. Small baby fingers couldn’t stay still while shadows hovered without a song.',
    actionNote: 'Pip grabbed his star wrench and set to work.',
    visualArt: (
      <div className="scene-art-box clock-scene">
        <div className="pendulum-clock">
          <div className="clock-face">
            <div className="clock-hands"></div>
          </div>
          <div className="pendulum-rod">
            <div className="pendulum-bob"></div>
          </div>
        </div>
        <div className="silence-waves">
          <span>tick...</span>
          <span>tock...</span>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'Act II: Brewing the Lullaby',
    subtitle: 'The Dream Foundry Kettle',
    badge: 'Tinkering',
    icon: '✨',
    body: 'Pip ground fallen comet dust with dried lavender blossoms inside the great copper kettle. When the steam rose, it didn’t just hiss — it hummed sweet pentatonic chords that warmed the cold floorboards.',
    actionNote: 'The air filled with sweet, sleepy violet mist.',
    visualArt: (
      <div className="scene-art-box kettle-scene">
        <div className="copper-kettle">
          <div className="kettle-steam steam-1">♪</div>
          <div className="kettle-steam steam-2">♫</div>
          <div className="kettle-steam steam-3">✦</div>
          <div className="kettle-base"></div>
          <div className="kettle-spout"></div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Act III: Packing the Cloud Basket',
    subtitle: 'Launchpad Seven',
    badge: 'Preparation',
    icon: '☁️',
    body: 'Forty blown-glass vials were packed into the flying wicker cradle. One for flying over candy hills, two for swimming with moon-whales, and thirty-seven for simple, deep, undisturbed sleep.',
    actionNote: 'Pink ribbons tied tight. Goggles on.',
    visualArt: (
      <div className="scene-art-box basket-scene">
        <div className="flying-basket">
          <div className="vial-rack">
            <div className="vial vial-pink"></div>
            <div className="vial vial-gold"></div>
            <div className="vial vial-cyan"></div>
            <div className="vial vial-lavender"></div>
          </div>
          <div className="basket-hull">🧺</div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'Act IV: Rooftop Delivery Run',
    subtitle: 'Across Slumber Valley',
    badge: 'Delivery',
    icon: '🌌',
    body: 'Gliding low across rain-slicked slate roofs, Pip scattered warm dream pollen down brick chimneys. Through nursery windows, crying babies quieted down, kicking off heavy blankets and smiling into their pillows.',
    actionNote: 'Every chimney received its warm lullaby puff.',
    visualArt: (
      <div className="scene-art-box flight-scene">
        <div className="sky-moon-slice">🌙</div>
        <div className="rooftop-silhouette">
          <div className="mini-chimney">
            <div className="dream-puff puff-1">☁️</div>
          </div>
          <div className="mini-chimney">
            <div className="dream-puff puff-2">✨</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: 'Act V: Sweet Slumber Falls',
    subtitle: 'All Quiet, 03:15 AM',
    badge: 'Resolution',
    icon: '💤',
    body: 'Across the entire valley, not a single baby cried. The silence wasn’t hollow anymore; it was full of peaceful dreams. Pip yawned a giant yawn, kicked off his boots, and curled into a star-mesh hammock.',
    actionNote: 'Job done. Junior Dream Engineer offline.',
    visualArt: (
      <div className="scene-art-box sleep-scene">
        <div className="star-hammock">
          <div className="hammock-curve">
            <div className="sleeping-pip-icon">💀💤</div>
          </div>
          <div className="twinkling-stars">
            <span className="star-twinkle st-1">✦</span>
            <span className="star-twinkle st-2">✧</span>
            <span className="star-twinkle st-3">⋆</span>
          </div>
        </div>
      </div>
    )
  }
];

export default function StoryScenes() {
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const sceneRefs = useRef([]);

  const handleSceneSelect = (idx) => {
    soundFx.playClick();
    setActiveSceneIdx(idx);
    const element = sceneRefs.current[idx];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  const nextScene = () => {
    if (activeSceneIdx < SCENES_DATA.length - 1) {
      handleSceneSelect(activeSceneIdx + 1);
    }
  };

  const prevScene = () => {
    if (activeSceneIdx > 0) {
      handleSceneSelect(activeSceneIdx - 1);
    }
  };

  return (
    <div className="story-scenes-container">
      {/* 90s Story Tape Navigator */}
      <div className="story-tape-nav">
        <div className="tape-label">
          <span>📼 PIP’S BEDTIME CHRONICLE:</span>
          <span>Scene {activeSceneIdx + 1} of {SCENES_DATA.length}</span>
        </div>

        <div className="tape-buttons" role="tablist">
          {SCENES_DATA.map((scene, i) => (
            <button
              key={scene.id}
              role="tab"
              aria-selected={i === activeSceneIdx}
              className={`tape-btn ${i === activeSceneIdx ? 'active-tape' : ''}`}
              onClick={() => handleSceneSelect(i)}
            >
              <span className="tape-idx">0{scene.id}</span>
              <span className="tape-title">{scene.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Featured Active Scene Window */}
      <div className="scene-display-window">
        {SCENES_DATA.map((scene, idx) => {
          const isActive = idx === activeSceneIdx;
          return (
            <div
              key={scene.id}
              ref={(el) => (sceneRefs.current[idx] = el)}
              className={`scene-card ${isActive ? 'scene-active' : 'scene-hidden'}`}
              style={{ display: isActive ? 'grid' : 'none' }}
            >
              <div className="scene-visual-col">
                {scene.visualArt}
              </div>

              <div className="scene-text-col">
                <div className="scene-header">
                  <span className="scene-tag">{scene.badge.toUpperCase()}</span>
                  <span className="scene-sub">{scene.subtitle}</span>
                </div>
                <h3 className="scene-title">{scene.title}</h3>
                <p className="scene-body-text">{scene.body}</p>
                <div className="scene-action-badge">
                  <span className="action-sparkle">★</span> {scene.actionNote}
                </div>

                <div className="scene-nav-arrows">
                  <button
                    className="retro-btn scene-arrow-btn"
                    onClick={prevScene}
                    disabled={activeSceneIdx === 0}
                    aria-label="Previous scene"
                  >
                    ◀ Prev Scene
                  </button>
                  <button
                    className="retro-btn scene-arrow-btn"
                    onClick={nextScene}
                    disabled={activeSceneIdx === SCENES_DATA.length - 1}
                    aria-label="Next scene"
                  >
                    Next Scene ▶
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
