import React from 'react';
import { soundFx } from '../utils/audio';

export default function SecretModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="secret-title">
      <div className="modal-content win95-window" onClick={(e) => e.stopPropagation()}>
        <div className="win-titlebar secret-titlebar">
          <div className="win-title-left">
            <span>✨ SECRET EASTER EGG UNLOCKED! ✨</span>
          </div>
          <button className="win-btn" onClick={onClose} aria-label="Close dialog">✕</button>
        </div>

        <div className="win-content secret-modal-body">
          <div className="secret-badge-icon">
            <span className="trophy-emoji">🏆</span>
            <span className="sparkle-orbit">🌙</span>
          </div>

          <h3 id="secret-title" className="secret-headline">Pip Wakes Up From His Catnap!</h3>

          <div className="secret-dialogue-bubble">
            <p className="secret-speech">
              "Psst! You found my secret dream workshop! Because you tapped the sleepy moon 3 times, I’m letting you in on the secret formula we use at Midnight Nursery:"
            </p>
            <ul className="secret-recipe-list">
              <li>🥄 <strong>2 Spoons:</strong> Crushed stardust from passing comets</li>
              <li>🫖 <strong>1 Cup:</strong> Warm chamomile lavender tea</li>
              <li>🧸 <strong>1 Hug:</strong> From the flappiest, softest blanket</li>
              <li>♫ <strong>Frequency:</strong> Exactly 432 Hz to cancel scary silences</li>
            </ul>
            <p className="secret-footnote">
              ★ You are now officially awarded the <strong>Golden Midnight Explorer Badge</strong>!
            </p>
          </div>

          <div className="secret-actions">
            <button
              className="retro-btn claim-badge-btn"
              onClick={() => {
                soundFx.playChime('C6', 'musicBox', 1.0);
                onClose();
              }}
            >
              ★ Tuck Badge Into Pajamas & Close ★
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
