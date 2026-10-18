import React, { useState, useEffect } from 'react';
import PipAvatar from './components/PipAvatar';
import PipBioWindow from './components/PipBioWindow';
import LullabyLab from './components/projects/LullabyLab';
import NightlightCollection from './components/projects/NightlightCollection';
import DreamDeliveryRoutes from './components/projects/DreamDeliveryRoutes';
import BedtimeStorybook from './components/projects/BedtimeStorybook';
import StoryScenes from './components/StoryScenes';
import HitCounter from './components/HitCounter';
import DreamGuestbook from './components/DreamGuestbook';
import DreamFlashlight from './components/DreamFlashlight';
import SparkleTrail from './components/SparkleTrail';
import SecretMoonEasterEgg from './components/SecretMoonEasterEgg';
import SecretModal from './components/SecretModal';
import RetroWebring from './components/RetroWebring';
import DreamAlchemyLab from './components/DreamAlchemyLab';
import AntiSilenceMachine from './components/AntiSilenceMachine';
import TuckPipInBed from './components/TuckPipInBed';
import GoldenDreamTicket from './components/GoldenDreamTicket';
import { soundFx } from './utils/audio';

export default function App() {
  const [isDayMode, setIsDayMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('pip_day_mode') === 'true';
    }
    return false;
  });

  const [isMuted, setIsMuted] = useState(true);
  const [isFlashlightActive, setIsFlashlightActive] = useState(false);
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);
  const [activeProjectTab, setActiveProjectTab] = useState('lullaby');

  // Persist day/night mode
  useEffect(() => {
    localStorage.setItem('pip_day_mode', String(isDayMode));
  }, [isDayMode]);

  const toggleMute = () => {
    const nextMuted = soundFx.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundFx.playChime('E5', 'glass', 0.6);
    }
  };

  const toggleDayMode = () => {
    soundFx.playClick();
    setIsDayMode((prev) => !prev);
  };

  const toggleFlashlight = () => {
    soundFx.playClick();
    setIsFlashlightActive((prev) => !prev);
  };

  const scrollToSection = (id) => {
    soundFx.playClick();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={`app-root ${isDayMode ? 'theme-day' : 'theme-midnight'}`}>
      {/* Sparkle Cursor Trail (accessible, respects prefers-reduced-motion) */}
      <SparkleTrail enabled={!isFlashlightActive} />

      {/* Dream Flashlight Spotlight Mask Mode */}
      <DreamFlashlight
        isActive={isFlashlightActive}
        onToggle={toggleFlashlight}
      />

      {/* Secret Easter Egg Modal */}
      <SecretModal
        isOpen={isSecretModalOpen}
        onClose={() => setIsSecretModalOpen(false)}
      />

      {/* Top 90s OS Retro Taskbar / Navigation */}
      <header className="retro-desktop-taskbar" role="banner">
        <div className="taskbar-brand">
          <span className="taskbar-logo">💤</span>
          <span className="taskbar-title">PIP'S BEDTIME OS 98</span>
        </div>

        <nav className="taskbar-nav-links" aria-label="Desktop Navigation">
          <button className="taskbar-item-btn" onClick={() => scrollToSection('about-pip')}>
            👤 About Pip
          </button>
          <button className="taskbar-item-btn" onClick={() => scrollToSection('projects-deck')}>
            🛠️ Inventions
          </button>
          <button className="taskbar-item-btn" onClick={() => scrollToSection('alchemy-lab')}>
            🧪 Dream Alchemy
          </button>
          <button className="taskbar-item-btn" onClick={() => scrollToSection('anti-silence')}>
            📻 Sleep Sounds
          </button>
          <button className="taskbar-item-btn highlight-taskbar-btn" onClick={() => scrollToSection('tuck-pip')}>
            🛌 Tuck Pip In
          </button>
          <button className="taskbar-item-btn highlight-taskbar-btn" onClick={() => scrollToSection('dream-ticket')}>
            🎟️ Golden Ticket
          </button>
          <button className="taskbar-item-btn" onClick={() => scrollToSection('story-chronicle')}>
            📖 Bedtime Story
          </button>
          <button className="taskbar-item-btn" onClick={() => scrollToSection('dream-guestbook')}>
            💌 Guestbook
          </button>
        </nav>

        <div className="taskbar-status-tray">
          {/* Secret Moon Easter Egg (Click 3x) */}
          <SecretMoonEasterEgg onUnlockSecret={() => setIsSecretModalOpen(true)} />

          {/* Flashlight Mode Quick Toggle */}
          <button
            className={`tray-toggle-btn ${isFlashlightActive ? 'active-tray-btn' : ''}`}
            onClick={toggleFlashlight}
            title="Toggle Dream Flashlight to search dark corners"
            aria-label="Toggle Dream Flashlight"
          >
            🔦 <span className="tray-btn-text">Lantern</span>
          </button>

          {/* Day / Night Mood Toggle */}
          <button
            className="tray-toggle-btn"
            onClick={toggleDayMode}
            title={`Switch to ${isDayMode ? 'Midnight Work Mode' : 'Morning Slumber Mode'}`}
            aria-label={`Switch to ${isDayMode ? 'Midnight Work Mode' : 'Morning Slumber Mode'}`}
          >
            {isDayMode ? '☀️' : '🌙'}
            <span className="tray-btn-text">{isDayMode ? 'Day Nap' : 'Midnight'}</span>
          </button>

          {/* Master Sound & MUTE Toggle (Strictly required: visible & working) */}
          <button
            className={`tray-toggle-btn sound-toggle-btn ${isMuted ? 'is-muted' : 'is-sound-on'}`}
            onClick={toggleMute}
            title={isMuted ? 'Audio is MUTED (click to enable chimes)' : 'Audio is ON (click to mute)'}
            aria-label={isMuted ? 'Unmute website audio' : 'Mute website audio'}
          >
            {isMuted ? '🔇' : '🔊'}
            <span className="tray-btn-text">{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>
        </div>
      </header>

      {/* 90s Under-Construction / Announcement Animated Marquee Ribbon */}
      <div className="marquee-under-construction" aria-label="Announcement marquee">
        <div className="marquee-content">
          <span>★ WELCOME TO PIP'S BEDTIME HOMEPAGE ★</span>
          <span>JUNIOR DREAM ENGINEER AT THE MIDNIGHT NURSERY ★</span>
          <span>"I BUILD THE DREAMS YOU FALL ASLEEP INSIDE" ★</span>
          <span>BEST VIEWED IN BED WITH WARM COCOA ★</span>
          <span>NO BAD DREAMS ALLOWED ★ GIGGLE RATIO: 100% ★</span>
        </div>
      </div>

      <main className="main-content-flow">
        {/* HERO SECTION: Pip's Cozy Bedroom Workbench */}
        <section className="hero-workbench-section" aria-label="Welcome and hero banner">
          <div className="hero-grid">
            <div className="hero-avatar-card">
              <div className="avatar-speech-bubble">
                {isDayMode
                  ? "Yawwwn... I’m sleeping in a sunbeam! Wake me when the moon rises 💤"
                  : "Hi, I'm Pip! I build dreams so no one has to sleep in silence. Click me for a giggle! ✨"}
              </div>

              {/* Interactive Vector SVG Pip with cursor-tracking eyes */}
              <PipAvatar isDayMode={isDayMode} size={280} />

              <div className="hero-sticker-badge">
                <span>🍼 100% Cute · Never Scary</span>
              </div>
            </div>

            <div className="hero-intro-card win95-window">
              <div className="win-titlebar">
                <span className="win-icon">🧸</span>
                <span className="win-title-text">WELCOME_TO_MY_BEDTIME_WORLD.EXE</span>
                <div className="win-controls">
                  <span className="win-btn">_</span>
                  <span className="win-btn">□</span>
                  <span className="win-btn">✕</span>
                </div>
              </div>

              <div className="win-content hero-intro-body">
                <div className="hero-tagline-block">
                  <span className="nursery-dept-pill">Cloud Sector 7 · Midnight Nursery</span>
                  <h1 className="hero-h1">Pip's Bedtime Homepage</h1>
                  <p className="hero-motto">"I build the dreams you fall asleep inside."</p>
                </div>

                <p className="hero-desc-text">
                  Hello! I’m a baby dream engineer with a cozy skull face, glowing eye sockets,
                  and a bedtime nightcap. When the nursery gets too silent, I brew star lullabies,
                  light bedside lanterns, and fly across rooftops to make sure everyone sleeps soundly.
                </p>

                <div className="hero-cta-button-group">
                  <button
                    className="retro-btn hero-primary-btn"
                    onClick={() => scrollToSection('projects-deck')}
                  >
                    🛠️ Test My Inventions
                  </button>
                  <button
                    className="retro-btn hero-tertiary-btn"
                    onClick={() => scrollToSection('alchemy-lab')}
                  >
                    🧪 Mix a Custom Dream
                  </button>
                  <button
                    className="retro-btn hero-secondary-btn"
                    onClick={() => scrollToSection('tuck-pip')}
                  >
                    🛌 Tuck Pip In
                  </button>
                  <button
                    className="retro-btn hero-gold-btn"
                    onClick={() => scrollToSection('dream-ticket')}
                  >
                    🎟️ Get Bedtime Ticket
                  </button>
                  <button
                    className="retro-btn hero-tertiary-btn"
                    onClick={toggleFlashlight}
                  >
                    🔦 Turn On Dream Lantern
                  </button>
                </div>

                <div className="sound-reminder-banner">
                  <span>💡 <strong>Sound check:</strong> Click the <strong>{isMuted ? '🔇 Muted' : '🔊 Sound On'}</strong> button in the top right tray to hear sweet music box chimes!</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: What Pip Is (Bio & Identity) */}
        <section id="about-pip" className="page-section section-about-pip" aria-labelledby="about-title">
          <div className="section-header-box">
            <span className="section-num-tag">[DOCUMENT 01]</span>
            <h2 id="about-title" className="section-title">What Pip Is: Identity & Personality</h2>
            <p className="section-subtitle">Official Midnight Nursery personnel record & field characteristics</p>
          </div>

          <PipBioWindow isDayMode={isDayMode} />
        </section>

        {/* SECTION 2: What Pip Does (4 Showcase Projects with 90s Tabs) */}
        <section id="projects-deck" className="page-section section-projects-deck" aria-labelledby="projects-title">
          <div className="section-header-box">
            <span className="section-num-tag">[DOCUMENT 02]</span>
            <h2 id="projects-title" className="section-title">What Pip Does: 4 Dream Inventions</h2>
            <p className="section-subtitle">Real interactive prototypes crafted inside the Midnight Nursery</p>
          </div>

          <div className="projects-showcase-window win95-window">
            <div className="win-titlebar">
              <span className="win-icon">⚙️</span>
              <span className="win-title-text">DREAM_LAB_INVENTIONS_DECK.SYS</span>
              <div className="win-controls">
                <span className="win-btn">_</span>
                <span className="win-btn">□</span>
                <span className="win-btn">✕</span>
              </div>
            </div>

            {/* 90s OS Tabs Header */}
            <div className="window-tab-bar" role="tablist" aria-label="Pip's Inventions">
              <button
                role="tab"
                aria-selected={activeProjectTab === 'lullaby'}
                className={`win-tab-btn ${activeProjectTab === 'lullaby' ? 'active-tab' : ''}`}
                onClick={() => {
                  soundFx.playClick();
                  setActiveProjectTab('lullaby');
                }}
              >
                🎵 1. Lullaby Lab
              </button>
              <button
                role="tab"
                aria-selected={activeProjectTab === 'nightlight'}
                className={`win-tab-btn ${activeProjectTab === 'nightlight' ? 'active-tab' : ''}`}
                onClick={() => {
                  soundFx.playClick();
                  setActiveProjectTab('nightlight');
                }}
              >
                💡 2. Nightlight Collection
              </button>
              <button
                role="tab"
                aria-selected={activeProjectTab === 'delivery'}
                className={`win-tab-btn ${activeProjectTab === 'delivery' ? 'active-tab' : ''}`}
                onClick={() => {
                  soundFx.playClick();
                  setActiveProjectTab('delivery');
                }}
              >
                🗺️ 3. Delivery Routes
              </button>
              <button
                role="tab"
                aria-selected={activeProjectTab === 'storybook'}
                className={`win-tab-btn ${activeProjectTab === 'storybook' ? 'active-tab' : ''}`}
                onClick={() => {
                  soundFx.playClick();
                  setActiveProjectTab('storybook');
                }}
              >
                📖 4. Bedtime Storybook
              </button>
            </div>

            <div className="win-content tab-panel-content">
              {activeProjectTab === 'lullaby' && (
                <div className="tab-pane-fade" role="tabpanel" aria-label="Lullaby Lab Project">
                  <div className="pane-intro">
                    <h3>Project 1: The Lullaby Lab</h3>
                    <p>A playable music box built with the Web Audio API. Pip hates silence, so he tunes pentatonic bells to chime sweet bedtime harmonies.</p>
                  </div>
                  <LullabyLab />
                </div>
              )}

              {activeProjectTab === 'nightlight' && (
                <div className="tab-pane-fade" role="tabpanel" aria-label="Nightlight Collection Project">
                  <div className="pane-intro">
                    <h3>Project 2: Nightlight Collection</h3>
                    <p>Porcelain bedside lamps and starlight jars. Adjust the ambient brightness slider and color spectral tint to soothe restless rooms.</p>
                  </div>
                  <NightlightCollection />
                </div>
              )}

              {activeProjectTab === 'delivery' && (
                <div className="tab-pane-fade" role="tabpanel" aria-label="Dream Delivery Routes Project">
                  <div className="pane-intro">
                    <h3>Project 3: Dream Delivery Routes</h3>
                    <p>The interactive flight map Pip uses to glide across chimney tops and drop lavender cloud puffs into slumbering homes.</p>
                  </div>
                  <DreamDeliveryRoutes />
                </div>
              )}

              {activeProjectTab === 'storybook' && (
                <div className="tab-pane-fade" role="tabpanel" aria-label="Bedtime Storybook Project">
                  <div className="pane-intro">
                    <h3>Project 4: Bedtime Storybook ("The Boy Who Lost His Yawn")</h3>
                    <p>Pip’s original bedtime picture book. Turn pages with Next/Prev buttons, keyboard arrow keys, or mobile swipe!</p>
                  </div>
                  <BedtimeStorybook />
                </div>
              )}
            </div>

            <div className="win-statusbar">
              <span>PROJECT ACTIVE: {activeProjectTab.toUpperCase()}</span>
              <span>PATENT: Midnight Nursery Laboratory</span>
            </div>
          </div>
        </section>

        {/* SECTION 2B (UNIQUE FEATURE): Pip's Dream Alchemy Lab */}
        <section id="alchemy-lab" className="page-section section-alchemy-lab" aria-labelledby="alchemy-title">
          <div className="section-header-box">
            <span className="section-num-tag">[INTERACTIVE WORKSHOP]</span>
            <h2 id="alchemy-title" className="section-title">Pip's Dream Alchemy Lab</h2>
            <p className="section-subtitle">Mix starlight ingredients from the nursery pantry to brew custom dreams</p>
          </div>

          <DreamAlchemyLab />
        </section>

        {/* SECTION 2C (UNIQUE FEATURE): Pip's Anti-Silence Ambient Sleep Machine */}
        <section id="anti-silence" className="page-section section-anti-silence" aria-labelledby="anti-silence-title">
          <div className="section-header-box">
            <span className="section-num-tag">[CANON QUIRK PROTOCOL]</span>
            <h2 id="anti-silence-title" className="section-title">Pip's Anti-Silence Ambient Sleep Synthesizer</h2>
            <p className="section-subtitle">Pip hates silence! Generate soothing rainfall, starlight hums, and lavender winds</p>
          </div>

          <AntiSilenceMachine
            isMuted={isMuted}
            onUnmuteRequest={() => {
              const nextMuted = soundFx.setMuted(false);
              setIsMuted(nextMuted);
            }}
          />
        </section>

        {/* SECTION 2D (HACKATHON WINNER FEATURE 1): Tuck Pip In / Virtual Bedtime Care */}
        <section id="tuck-pip" className="page-section section-tuck-pip" aria-labelledby="tuck-title">
          <div className="section-header-box">
            <span className="section-num-tag">[VIRTUAL BEDTIME CARE]</span>
            <h2 id="tuck-title" className="section-title">Pip's Star Hammock: Tuck Pip Into Bed</h2>
            <p className="section-subtitle">Feed warm cocoa, give Barnaby the Bear, pull the starry blanket, and play sweet lullabies</p>
          </div>

          <TuckPipInBed
            isMuted={isMuted}
            onUnmuteRequest={() => {
              const nextMuted = soundFx.setMuted(false);
              setIsMuted(nextMuted);
            }}
            onNavigateToTicket={() => scrollToSection('dream-ticket')}
          />
        </section>

        {/* SECTION 2E (HACKATHON WINNER FEATURE 2): Official Golden Dream Ticket Generator */}
        <section id="dream-ticket" className="page-section section-dream-ticket" aria-labelledby="ticket-section-title">
          <div className="section-header-box">
            <span className="section-num-tag">[OFFICIAL PASSPORT OFFICE]</span>
            <h2 id="ticket-section-title" className="section-title">Official Golden Bedtime Ticket Office</h2>
            <p className="section-subtitle">Generate and download your high-resolution 2x souvenir boarding pass for tonight's dream flight</p>
          </div>

          <GoldenDreamTicket />
        </section>

        {/* SECTION 3: Story (5 Scroll-Triggered Scenes) */}
        <section id="story-chronicle" className="page-section section-story-chronicle" aria-labelledby="story-title">
          <div className="section-header-box">
            <span className="section-num-tag">[DOCUMENT 03]</span>
            <h2 id="story-title" className="section-title">Pip's Story: The Origin of the Dreams</h2>
            <p className="section-subtitle">How a tiny baby who hated silence began engineering sweet slumber for the world</p>
          </div>

          <StoryScenes />
        </section>

        {/* SECTION 4: Hit Counter & Immersion */}
        <section id="counter-section" className="page-section section-counter" aria-labelledby="counter-title">
          <div className="section-header-box">
            <span className="section-num-tag">[TELEMETRY]</span>
            <h2 id="counter-title" className="section-title">Midnight Nursery Live Telemetry</h2>
            <p className="section-subtitle">Real-time dream dispersion stats and mechanical odometer</p>
          </div>

          <HitCounter />
        </section>

        {/* SECTION 5: Live Guestbook (Leave a Dream Wish) */}
        <section id="dream-guestbook" className="page-section section-guestbook" aria-labelledby="guestbook-title">
          <div className="section-header-box">
            <span className="section-num-tag">[COMMUNITY]</span>
            <h2 id="guestbook-title" className="section-title">The Slumber Registry: Leave a Dream Wish</h2>
            <p className="section-subtitle">Sign Pip's guestbook before tucking yourself under the covers</p>
          </div>

          <DreamGuestbook />
        </section>

        {/* Retro Webring & Mandatory Credits Footer */}
        <RetroWebring />
      </main>
    </div>
  );
}
