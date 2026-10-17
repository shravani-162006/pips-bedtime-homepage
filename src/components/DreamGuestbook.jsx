import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

const PRELOADED_WISHES = [
  {
    id: 'seed-1',
    name: 'Luna_Starlight',
    icon: '🌙',
    message: 'May everyone who reads this wake up before their alarm feeling 100% cozy and well-rested!',
    date: 'Oct 17, 10:14 PM'
  },
  {
    id: 'seed-2',
    name: 'SleepyOliver',
    icon: '🧸',
    message: 'I finally found my yawn thanks to Pip’s storybook. Sending hugs from bedroom window #3!',
    date: 'Oct 17, 10:32 PM'
  },
  {
    id: 'seed-3',
    name: 'PixelDreamer_99',
    icon: '✨',
    message: 'Pip, your music box chord in C5 is pure magic. Keep engineering sweet dreams!',
    date: 'Oct 17, 11:05 PM'
  },
  {
    id: 'seed-4',
    name: 'BarnabyBear',
    icon: '☁️',
    message: 'Wishing every tired soul a cloud soft as marshmallow fluff tonight.',
    date: 'Oct 17, 11:40 PM'
  }
];

const BAD_WORDS = ['hate', 'ugly', 'stupid', 'curse', 'kill', 'die', 'bad'];

function sanitizeText(str) {
  if (!str) return '';
  let clean = str.trim();
  // Basic bad-word soft filter
  BAD_WORDS.forEach((word) => {
    const reg = new RegExp(`\\b${word}\\b`, 'gi');
    clean = clean.replace(reg, '***');
  });
  return clean;
}

export default function DreamGuestbook() {
  const [wishes, setWishes] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('pip_dream_guestbook');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {}
      }
    }
    return PRELOADED_WISHES;
  });

  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedIcon, setSelectedIcon] = useState('✨');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusFeedback, setStatusFeedback] = useState(null);
  const [cooldownRemaining, setCooldownRemaining] = useState(0);

  // Sync with API on mount
  useEffect(() => {
    let isMounted = true;
    fetch('/api/guestbook')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (isMounted && data && Array.isArray(data.wishes) && data.wishes.length > 0) {
          // Merge API wishes with local preloaded
          setWishes(data.wishes);
          localStorage.setItem('pip_dream_guestbook', JSON.stringify(data.wishes));
        }
      })
      .catch(() => {
        // Use local storage
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Cooldown countdown
  useEffect(() => {
    if (cooldownRemaining <= 0) return;
    const timer = setInterval(() => {
      setCooldownRemaining((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [cooldownRemaining]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cooldownRemaining > 0) {
      setStatusFeedback(`Please wait ${cooldownRemaining}s before sending another dream wish!`);
      return;
    }

    const cleanName = sanitizeText(name).slice(0, 20);
    const cleanMessage = sanitizeText(message).slice(0, 140);

    if (!cleanName || cleanName.length < 2) {
      setStatusFeedback('Please enter a name (at least 2 characters).');
      return;
    }
    if (!cleanMessage || cleanMessage.length < 3) {
      setStatusFeedback('Please write a sweet dream wish (at least 3 characters).');
      return;
    }

    setIsSubmitting(true);
    setStatusFeedback(null);

    const now = new Date();
    const dateFormatted = `${now.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newWish = {
      id: `wish-${Date.now()}`,
      name: cleanName,
      icon: selectedIcon,
      message: cleanMessage,
      date: dateFormatted
    };

    // Optimistic UI update
    const updatedWishes = [newWish, ...wishes];
    setWishes(updatedWishes);
    localStorage.setItem('pip_dream_guestbook', JSON.stringify(updatedWishes));

    soundFx.playChime('C6', 'glass', 1.0);
    setName('');
    setMessage('');
    setCooldownRemaining(20); // 20s rate limit
    setStatusFeedback('✨ Your dream wish was tucked into Pip’s bedtime registry!');

    // Post to backend
    try {
      await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newWish)
      });
    } catch {
      // Saved in localStorage
    } finally {
      setIsSubmitting(false);
    }
  };

  const icons = ['✨', '🌙', '☁️', '🧸', '🍭', '🚀', '💤'];

  return (
    <div className="guestbook-container">
      {/* 90s Guestbook Submission Desk */}
      <div className="guestbook-form-card">
        <div className="guestbook-header">
          <span className="guestbook-icon">📖</span>
          <div>
            <h4 className="guestbook-title">Midnight Nursery Guestbook</h4>
            <p className="guestbook-subtitle">Leave a cozy wish or secret lullaby for Pip and tonight's dreamers.</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="guestbook-form">
          <div className="form-row">
            <div className="form-group name-group">
              <label htmlFor="guest-name" className="retro-label">YOUR DREAMER NAME (max 20):</label>
              <input
                id="guest-name"
                type="text"
                maxLength={20}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. StarrySam"
                className="retro-input"
                required
              />
            </div>

            <div className="form-group icon-group">
              <span className="retro-label">DREAM BADGE:</span>
              <div className="emblem-picker">
                {icons.map((ic) => (
                  <button
                    type="button"
                    key={ic}
                    className={`emblem-btn ${selectedIcon === ic ? 'active-emblem' : ''}`}
                    onClick={() => {
                      soundFx.playClick();
                      setSelectedIcon(ic);
                    }}
                    aria-label={`Select icon ${ic}`}
                  >
                    {ic}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="label-with-char-count">
              <label htmlFor="guest-msg" className="retro-label">YOUR DREAM WISH (max 140):</label>
              <span className="char-count">{message.length}/140</span>
            </div>
            <textarea
              id="guest-msg"
              maxLength={140}
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="e.g. Wishing warm cinnamon toast and peaceful dreams to all..."
              className="retro-textarea"
              required
            />
          </div>

          <div className="form-footer">
            <button
              type="submit"
              className="retro-btn submit-wish-btn"
              disabled={isSubmitting || cooldownRemaining > 0}
            >
              {isSubmitting
                ? 'Tucking In Wish...'
                : cooldownRemaining > 0
                ? `Cooldown (${cooldownRemaining}s)`
                : 'Send Dream Wish ✨'}
            </button>

            {statusFeedback && (
              <span className="guestbook-feedback-badge">{statusFeedback}</span>
            )}
          </div>
        </form>
      </div>

      {/* Guestbook Entries Stream */}
      <div className="guestbook-entries-stream">
        <div className="stream-header">
          <span>★ RECENT COMMUNITY WISHES ({wishes.length})</span>
          <small>Auto-synchronized with Midnight Nursery ledger</small>
        </div>

        <div className="wishes-grid">
          {wishes.map((w) => (
            <div key={w.id} className="wish-card">
              <div className="wish-card-top">
                <span className="wish-emblem">{w.icon}</span>
                <span className="wish-author">{w.name}</span>
                <span className="wish-date">{w.date}</span>
              </div>
              <p className="wish-text">"{w.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
