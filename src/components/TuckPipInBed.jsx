import React, { useState, useEffect } from 'react';
import { soundFx } from '../utils/audio';

export default function TuckPipInBed({ isMuted, onUnmuteRequest, onNavigateToTicket }) {
  const [sleepiness, setSleepiness] = useState(25);
  const [hasTeddy, setHasTeddy] = useState(false);
  const [hasCocoa, setHasCocoa] = useState(false);
  const [blanketPulled, setBlanketPulled] = useState(false);
  const [lullabyPlaying, setLullabyPlaying] = useState(false);
  const [silenceAlarm, setSilenceAlarm] = useState(false);
  const [speechText, setSpeechText] = useState("I'm getting a little sleepy... can you tuck me into my star hammock?");
  const [isFullyAsleep, setIsFullyAsleep] = useState(false);

  // Pip hates silence: if audio is muted or no lullaby while trying to sleep, warn the visitor
  useEffect(() => {
    if (sleepiness >= 60 && isMuted && !lullabyPlaying) {
      setSilenceAlarm(true);
      setSpeechText("Eep! It's too silent in the room! The nursery clock ticks too loud... please turn on sound! 🔇⚠️");
    } else {
      setSilenceAlarm(false);
      if (sleepiness >= 100) {
        setIsFullyAsleep(true);
        setSpeechText("Zzz... warm cocoa, fluffy teddy, sweet lullaby. Goodnight world! ✨💤");
      }
    }
  }, [sleepiness, isMuted, lullabyPlaying]);

  // Periodic snore when fully asleep
  useEffect(() => {
    if (!isFullyAsleep) return;
    const interval = setInterval(() => {
      soundFx.playSnoreSound();
    }, 4500);
    return () => clearInterval(interval);
  }, [isFullyAsleep]);

  const handleGiveCocoa = () => {
    soundFx.playClick();
    if (isMuted) onUnmuteRequest?.();
    soundFx.playSipCocoaSound();
    setHasCocoa(true);
    setSleepiness((prev) => Math.min(100, prev + 25));
    setSpeechText("Slurp! Warm star cocoa with marshmallows... *yaaaawn*! ☕✨");
  };

  const handleGiveTeddy = () => {
    soundFx.playClick();
    if (isMuted) onUnmuteRequest?.();
    soundFx.playTuckInSound();
    setHasTeddy(true);
    setSleepiness((prev) => Math.min(100, prev + 25));
    setSpeechText("Aww, Barnaby the Bear! He smells like lavender wool! 🧸💜");
  };

  const handleToggleBlanket = () => {
    soundFx.playClick();
    if (isMuted) onUnmuteRequest?.();
    soundFx.playTuckInSound();
    const next = !blanketPulled;
    setBlanketPulled(next);
    setSleepiness((prev) => Math.min(100, prev + (next ? 25 : -25)));
    setSpeechText(next ? "Ooh, the starlight cloud blanket is so warm and snug! ☁️⭐" : "Brr! Pip kicked the blanket off! 🥶");
  };

  const handlePlayLullaby = () => {
    soundFx.playClick();
    if (isMuted) onUnmuteRequest?.();
    setLullabyPlaying(true);
    setSleepiness((prev) => Math.min(100, prev + 25));
    setSpeechText("Ding, dong, chime... that music box sounds like falling stars! 🎵🌙");

    // Play soothing pentatonic chime progression
    soundFx.playChime('C5', 'musicBox', 1.2);
    setTimeout(() => soundFx.playChime('E5', 'musicBox', 1.2), 350);
    setTimeout(() => soundFx.playChime('G5', 'glass', 1.4), 700);
    setTimeout(() => soundFx.playChime('C6', 'harp', 1.8), 1050);
    setTimeout(() => soundFx.playChime('A5', 'musicBox', 1.2), 1400);
    setTimeout(() => soundFx.playChime('G5', 'glass', 1.6), 1750);
  };

  const handleReset = () => {
    soundFx.playClick();
    setSleepiness(20);
    setHasTeddy(false);
    setHasCocoa(false);
    setBlanketPulled(false);
    setLullabyPlaying(false);
    setIsFullyAsleep(false);
    setSpeechText("Good morning! Or... good evening? Let's get cozy again! ☀️");
  };

  return (
    <div className="tuck-pip-window win95-window" id="tuck-pip-workbench">
      <div className="win-titlebar">
        <span className="win-icon">🛌</span>
        <span className="win-title-text">MIDNIGHT_NURSERY_SLUMBER_CRADLE.EXE [TAMAGOTCHI]</span>
        <div className="win-controls">
          <span className="win-btn">_</span>
          <span className="win-btn">□</span>
          <span className="win-btn">✕</span>
        </div>
      </div>

      <div className="win-content tuck-pip-body">
        {/* Intro banner */}
        <div className="tuck-intro-header">
          <div className="tuck-badge-pill">★ HACKATHON WINNER EXCLUSIVE: VIRTUAL BEDTIME CARE ★</div>
          <h3 className="tuck-h3">Tuck Pip Into His Star Hammock</h3>
          <p className="tuck-sub">
            Pip worked all night engineering dreams. Feed him warm cocoa, tuck his teddy in,
            pull the starry blanket, and play his music box so he can finally drift off to sleep!
          </p>
        </div>

        {/* The Live Interactive Hammock Stage */}
        <div className={`hammock-stage-box ${isFullyAsleep ? 'is-asleep-mode' : ''} ${silenceAlarm ? 'is-silence-alarm' : ''}`}>
          {/* Animated Stars & Cloud Background */}
          <div className="stage-starlight-sky">
            <span className="star-twinkle s1">✨</span>
            <span className="star-twinkle s2">⭐</span>
            <span className="star-twinkle s3">🌟</span>
            <span className="star-twinkle s4">✨</span>
            <span className="cloud-drift c1">☁️</span>
            <span className="cloud-drift c2">☁️</span>
          </div>

          {/* Speech dialogue bubble */}
          <div className="pip-bed-speech-bubble" role="status" aria-live="polite">
            <span className="bubble-tail"></span>
            {speechText}
          </div>

          {/* The Star Hammock / Wooden Cradle Vector */}
          <div className="cradle-and-pip-wrapper">
            {/* Cradle Frame */}
            <div className="cradle-wood-post left-post">
              <span className="post-moon">🌙</span>
            </div>

            <div className={`hammock-cloth ${blanketPulled ? 'blanket-snug' : ''}`}>
              {/* Pip in bed */}
              <div className={`pip-bed-character ${isFullyAsleep ? 'breathing-sleep' : ''}`}>
                {/* Nightcap */}
                <div className="bed-nightcap">
                  <div className="nightcap-cone"></div>
                  <div className="nightcap-pom">⭐</div>
                </div>

                {/* Skull Face */}
                <div className="bed-skull-face">
                  {/* Eye Sockets */}
                  <div className="bed-eye-row">
                    {isFullyAsleep ? (
                      <>
                        <div className="bed-eye eye-closed-sleeping">‿</div>
                        <div className="bed-eye eye-closed-sleeping">‿</div>
                      </>
                    ) : silenceAlarm ? (
                      <>
                        <div className="bed-eye eye-alarmed">⊙</div>
                        <div className="bed-eye eye-alarmed">⊙</div>
                      </>
                    ) : sleepiness > 50 ? (
                      <>
                        <div className="bed-eye eye-droopy">●</div>
                        <div className="bed-eye eye-droopy">●</div>
                      </>
                    ) : (
                      <>
                        <div className="bed-eye eye-awake"><span className="pupil-pinprick"></span></div>
                        <div className="bed-eye eye-awake"><span className="pupil-pinprick"></span></div>
                      </>
                    )}
                  </div>

                  {/* Cute crooked smile */}
                  <div className="bed-smile">
                    {isFullyAsleep ? '◡' : '⌣'}
                  </div>

                  {/* Rosy cheeks */}
                  <div className="bed-cheek cheek-l"></div>
                  <div className="bed-cheek cheek-r"></div>
                </div>

                {/* Cozy Accessories inside bed */}
                {hasTeddy && (
                  <div className="bed-accessory teddy-in-bed" title="Barnaby the Bear is tucked in with Pip!">
                    🧸
                  </div>
                )}

                {hasCocoa && (
                  <div className="bed-accessory cocoa-on-nightstand" title="Warm Star Cocoa">
                    ☕
                  </div>
                )}

                {/* Floating Sleep Zzzs */}
                {isFullyAsleep && (
                  <div className="sleep-floating-zzzs">
                    <span className="zzz z1">z</span>
                    <span className="zzz z2">Z</span>
                    <span className="zzz z3">Z</span>
                    <span className="sleep-sparkle">✨</span>
                  </div>
                )}
              </div>

              {/* Blanket Layer */}
              <div className={`star-blanket-layer ${blanketPulled ? 'pulled-up' : 'folded-down'}`}>
                <div className="blanket-pattern">
                  <span>★</span><span>☁</span><span>★</span><span>☁</span><span>★</span>
                </div>
              </div>
            </div>

            <div className="cradle-wood-post right-post">
              <span className="post-moon">🌙</span>
            </div>
          </div>

          {/* Canon Warning Banner: Pip Hates Silence */}
          {silenceAlarm && (
            <div className="silence-alert-banner">
              <span className="alert-blink">⚠️</span>
              <strong>CANON QUIRK PROTOCOL:</strong> Pip hates silence! Unmute audio or play a lullaby to let Pip fall asleep.
            </div>
          )}
        </div>

        {/* Sleepiness Meter & Telemetry */}
        <div className="sleepiness-meter-panel">
          <div className="meter-label-row">
            <span className="meter-title">💤 SLUMBER INDEX:</span>
            <span className="meter-percentage">{sleepiness}% {isFullyAsleep ? '(DEEP DREAMING)' : sleepiness > 50 ? '(DROWSY)' : '(AWAKE)'}</span>
          </div>
          <div className="meter-track-win95">
            <div
              className={`meter-fill-bar ${isFullyAsleep ? 'meter-asleep' : ''}`}
              style={{ width: `${sleepiness}%` }}
            ></div>
          </div>
        </div>

        {/* Bedtime Action Buttons */}
        <div className="bedtime-action-grid">
          <button
            className={`retro-btn care-btn ${hasCocoa ? 'btn-done' : ''}`}
            onClick={handleGiveCocoa}
            disabled={hasCocoa}
          >
            ☕ {hasCocoa ? '✓ Cocoa Finished' : '1. Give Star Cocoa (+25%)'}
          </button>

          <button
            className={`retro-btn care-btn ${hasTeddy ? 'btn-done' : ''}`}
            onClick={handleGiveTeddy}
            disabled={hasTeddy}
          >
            🧸 {hasTeddy ? '✓ Teddy Tucked In' : '2. Give Teddy Bear (+25%)'}
          </button>

          <button
            className={`retro-btn care-btn ${blanketPulled ? 'btn-done' : ''}`}
            onClick={handleToggleBlanket}
          >
            ☁️ {blanketPulled ? '✓ Blanket Snug (+25%)' : '3. Pull Cloud Blanket (+25%)'}
          </button>

          <button
            className={`retro-btn care-btn ${lullabyPlaying ? 'btn-done' : ''}`}
            onClick={handlePlayLullaby}
          >
            🎵 {lullabyPlaying ? '✓ Music Box Playing' : '4. Wind Lullaby Box (+25%)'}
          </button>
        </div>

        {/* Master Bedtime Engineer Certificate (When 100% asleep) */}
        {isFullyAsleep && (
          <div className="tuck-reward-card">
            <div className="reward-badge">🏅 MASTER SLUMBER ENGINEER AWARD 🏅</div>
            <p className="reward-text">
              Pip is sleeping soundly without fear of cold silence! You've successfully conquered the Bedtime Challenge.
            </p>
            <div className="reward-actions">
              <button
                className="retro-btn reward-ticket-btn"
                onClick={() => {
                  soundFx.playClick();
                  onNavigateToTicket?.();
                }}
              >
                🎟️ Claim Your Official Bedtime Ticket →
              </button>
              <button
                className="retro-btn reward-reset-btn"
                onClick={handleReset}
              >
                🔄 Wake Pip for Tomorrow's Shift
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
