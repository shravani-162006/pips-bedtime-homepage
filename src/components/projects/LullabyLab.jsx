import React, { useState, useEffect, useRef } from 'react';
import { soundFx } from '../../utils/audio';

const PENTATONIC_KEYS = [
  { note: 'C4', label: 'C', keyChar: '1', color: '#FFB5A7' },
  { note: 'D4', label: 'D', keyChar: '2', color: '#FCD5CE' },
  { note: 'E4', label: 'E', keyChar: '3', color: '#F8EDEB' },
  { note: 'G4', label: 'G', keyChar: '4', color: '#D8E2DC' },
  { note: 'A4', label: 'A', keyChar: '5', color: '#ECE4DB' },
  { note: 'C5', label: 'C²', keyChar: '6', color: '#FFE5D9' },
  { note: 'D5', label: 'D²', keyChar: '7', color: '#FFCAD4' },
  { note: 'E5', label: 'E²', keyChar: '8', color: '#B8C0FF' },
];

const PIP_LULLABY_SEQUENCE = [
  { note: 'E4', delay: 0 },
  { note: 'G4', delay: 400 },
  { note: 'A4', delay: 800 },
  { note: 'C5', delay: 1200 },
  { note: 'A4', delay: 1600 },
  { note: 'G4', delay: 2000 },
  { note: 'E4', delay: 2400 },
  { note: 'D4', delay: 2800 },
  { note: 'C4', delay: 3200 },
  { note: 'E4', delay: 3600 },
  { note: 'D4', delay: 4000 },
  { note: 'C4', delay: 4600 }
];

export default function LullabyLab() {
  const [activeNote, setActiveNote] = useState(null);
  const [timbre, setTimbre] = useState('musicBox'); // 'musicBox' | 'glass' | 'harp'
  const [isPlayingAuto, setIsPlayingAuto] = useState(false);
  const [windingKeyRotation, setWindingKeyRotation] = useState(0);
  const [floatingNotes, setFloatingNotes] = useState([]);
  const lullabyTimeoutsRef = useRef([]);

  const playNote = (note) => {
    soundFx.playChime(note, timbre);
    setActiveNote(note);
    setWindingKeyRotation((r) => r + 45);

    // Spawn floating musical particle
    const symbols = ['♪', '♫', '♬', '✦', '✧', '⋆'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    const id = Date.now() + Math.random();
    setFloatingNotes((prev) => [...prev, { id, symbol, x: Math.random() * 80 + 10 }]);

    setTimeout(() => {
      setFloatingNotes((prev) => prev.filter((n) => n.id !== id));
    }, 1500);

    setTimeout(() => {
      setActiveNote((curr) => (curr === note ? null : curr));
    }, 280);
  };

  // Keyboard support for keys 1-8
  useEffect(() => {
    const handleKeyDown = (e) => {
      const match = PENTATONIC_KEYS.find((k) => k.keyChar === e.key);
      if (match) {
        playNote(match.note);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [timbre]);

  const stopAutoPlay = () => {
    lullabyTimeoutsRef.current.forEach(clearTimeout);
    lullabyTimeoutsRef.current = [];
    setIsPlayingAuto(false);
    setActiveNote(null);
  };

  const playPipLullaby = () => {
    if (isPlayingAuto) {
      stopAutoPlay();
      return;
    }

    setIsPlayingAuto(true);
    PIP_LULLABY_SEQUENCE.forEach(({ note, delay }, idx) => {
      const timeout = setTimeout(() => {
        playNote(note);
        if (idx === PIP_LULLABY_SEQUENCE.length - 1) {
          setIsPlayingAuto(false);
        }
      }, delay);
      lullabyTimeoutsRef.current.push(timeout);
    });
  };

  useEffect(() => {
    return () => stopAutoPlay();
  }, []);

  return (
    <div className="lullaby-lab-container">
      {/* 90s Music Box Hardware Frame */}
      <div className="music-box-hardware">
        <div className="music-box-top-panel">
          <div className="winding-key-assembly" onClick={() => {
            soundFx.playClick();
            setWindingKeyRotation((r) => r + 90);
          }} title="Click to wind the music box spring!">
            <div
              className="golden-winding-key"
              style={{ transform: `rotate(${windingKeyRotation}deg)` }}
            >
              <div className="key-handle"></div>
              <div className="key-stem"></div>
            </div>
            <span className="key-label">WIND KEY ↺</span>
          </div>

          <div className="music-box-visualizer">
            {/* Floating musical particles */}
            {floatingNotes.map(({ id, symbol, x }) => (
              <span
                key={id}
                className="floating-note-particle"
                style={{ left: `${x}%` }}
              >
                {symbol}
              </span>
            ))}
            <div className="visualizer-screen">
              <span className="current-note-display">
                {activeNote ? `Playing: ${activeNote}` : (isPlayingAuto ? "♪ Playing Pip's Lullaby..." : "♫ Ready for notes")}
              </span>
              <div className="visualizer-bars">
                {[40, 75, 55, 90, 60, 80, 45, 95].map((h, i) => (
                  <div
                    key={i}
                    className="visualizer-bar"
                    style={{
                      height: activeNote || isPlayingAuto ? `${(h * (Math.sin(Date.now() / 150 + i) + 1.2)) / 2}%` : '15%',
                      transition: 'height 0.15s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="music-box-controls">
            <button
              className={`retro-btn auto-lullaby-btn ${isPlayingAuto ? 'playing-pulse' : ''}`}
              onClick={playPipLullaby}
              aria-label={isPlayingAuto ? "Stop Pip's Lullaby" : "Play Pip's Lullaby"}
            >
              {isPlayingAuto ? '⏹ Stop Lullaby' : '▶ Play Pip’s Melody'}
            </button>

            <div className="timbre-selector">
              <label htmlFor="timbre-select" className="retro-micro-label">TIMBRE:</label>
              <select
                id="timbre-select"
                value={timbre}
                onChange={(e) => {
                  soundFx.playClick();
                  setTimbre(e.target.value);
                }}
                className="retro-select"
              >
                <option value="musicBox">Golden Music Box</option>
                <option value="glass">Crystal Chimes</option>
                <option value="harp">Sleepy Dream Harp</option>
              </select>
            </div>
          </div>
        </div>

        {/* Pentatonic Chime Keys */}
        <div className="chime-keyboard" role="group" aria-label="Lullaby pentatonic chime keys">
          {PENTATONIC_KEYS.map((k) => (
            <button
              key={k.note}
              className={`chime-key ${activeNote === k.note ? 'active-chime-key' : ''}`}
              style={{ backgroundColor: k.color }}
              onClick={() => playNote(k.note)}
              aria-label={`Play chime ${k.note}`}
            >
              <span className="chime-key-note">{k.label}</span>
              <span className="chime-key-char">[{k.keyChar}]</span>
              <div className="chime-key-pin"></div>
            </button>
          ))}
        </div>

        <div className="music-box-footer-note">
          <small>★ Tip: Press number keys [1] through [8] on your keyboard to play melodies!</small>
        </div>
      </div>
    </div>
  );
}
