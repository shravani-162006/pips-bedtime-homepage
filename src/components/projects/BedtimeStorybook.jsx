import React, { useState, useEffect } from 'react';
import { soundFx } from '../../utils/audio';

const STORY_PAGES = [
  {
    type: 'cover',
    title: 'The Boy Who Lost His Yawn',
    subtitle: 'A Midnight Nursery Tale',
    author: 'Written & Illustrated by Pip',
    badge: '1st Edition · Bedtime Classic',
    image: '/assets/pip_portrait.png',
    flavor: 'Open this little book when the moon is high and your eyelids feel heavy.'
  },
  {
    type: 'story',
    pageNumber: 1,
    chapter: 'Chapter I: The Search',
    text: 'Little Oliver checked under the wool rug, behind the grandfather clock, and deep inside his striped pajama socks. But his bedtime yawn was nowhere to be found.\n\n"If I cannot yawn," Oliver sighed to his teddy bear, "how will my dreams know it is time to begin?"',
    illustration: '🧸 🕰️ 🧦',
    sceneCaption: 'Oliver looking under the creaky oak floorboards.'
  },
  {
    type: 'story',
    pageNumber: 2,
    chapter: 'Chapter II: The Little Visitor',
    text: 'Just then, a soft tapping sounded at the windowsill. Floating on a fluffy lavender mist was Pip, wearing a starry nightcap and holding a brass dream lantern.\n\n"You didn’t lose your yawn," Pip giggled. "You were simply holding your breath against the quiet. The quiet is friendly."',
    illustration: '🌙 ☁️ 🕯️',
    sceneCaption: 'Pip hovering outside the window with a friendly grin.'
  },
  {
    type: 'story',
    pageNumber: 3,
    chapter: 'Chapter III: Star Dust Mist',
    text: 'Pip uncorked a tiny crystal vial. A sprinkle of glowing stardust danced across Oliver’s eyelashes like warm dandelion fluff.\n\n"Listen to the hum of the rooftops," Pip whispered. "Close your eyes and breathe in the lavender breeze."',
    illustration: '✨ 🌌 💤',
    sceneCaption: 'Stardust settling softly across the bedroom ceiling.'
  },
  {
    type: 'story',
    pageNumber: 4,
    chapter: 'Chapter IV: The Great Yawn',
    text: 'Oliver took a long, deep breath. Way down in his toes, a sleepy tickle began to rise. It traveled up his legs, rolled through his chest, and burst open into the biggest, coziest, sweetest yawn in the entire world.\n\n"Gotcha!" whispered Pip with a tiny wink.',
    illustration: '🥱 🛏️ 🎈',
    sceneCaption: 'Oliver stretching wide under his quilted blanket.'
  },
  {
    type: 'backcover',
    title: 'Sweet Dreams, Little Sleepers',
    text: 'Oliver was asleep before Pip could even tighten the golden lantern latch. Another bedtime safely solved.\n\nRemember: whenever sleep feels far away, Pip is only one whisper in the stars away.',
    badge: '★ Midnight Nursery Stamp of Good Sleep ★',
    illustration: '⭐ 🍼 🧸'
  }
];

export default function BedtimeStorybook() {
  const [currentPage, setCurrentPage] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  const totalPages = STORY_PAGES.length;

  const goToPage = (newIndex) => {
    if (newIndex < 0 || newIndex >= totalPages || newIndex === currentPage) return;
    soundFx.playChime('E5', 'glass', 0.8);
    setIsFlipping(true);
    setCurrentPage(newIndex);
    setTimeout(() => setIsFlipping(false), 350);
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Keyboard navigation: ArrowLeft and ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 45) {
      nextPage(); // swipe left -> next page
    } else if (diff < -45) {
      prevPage(); // swipe right -> prev page
    }
    setTouchStartX(null);
  };

  const page = STORY_PAGES[currentPage];

  return (
    <div className="storybook-container">
      {/* Book Exterior / Spine Deck */}
      <div
        className={`storybook-paper ${isFlipping ? 'page-turning-anim' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="book-ribbon-bookmark">★</div>

        {page.type === 'cover' && (
          <div className="book-page page-cover">
            <div className="cover-border">
              <span className="cover-badge">{page.badge}</span>
              <h3 className="cover-title">{page.title}</h3>
              <p className="cover-subtitle">{page.subtitle}</p>

              <div className="cover-art-container">
                <img
                  src={page.image}
                  alt="Pip the dream engineer"
                  className="cover-portrait-img"
                />
              </div>

              <p className="cover-author">{page.author}</p>
              <p className="cover-flavor">"{page.flavor}"</p>
              <button
                className="retro-btn turn-page-prompt-btn"
                onClick={nextPage}
                aria-label="Open storybook"
              >
                Open Storybook 📖 ▶
              </button>
            </div>
          </div>
        )}

        {page.type === 'story' && (
          <div className="book-page page-content">
            <div className="page-header-ribbon">
              <span className="page-chapter-label">{page.chapter}</span>
              <span className="page-number-pill">Page {page.pageNumber}</span>
            </div>

            <div className="page-illustration-stage">
              <div className="story-emoji-art">{page.illustration}</div>
              <small className="scene-caption">{page.sceneCaption}</small>
            </div>

            <div className="page-text-body">
              {page.text.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="story-paragraph">{paragraph}</p>
              ))}
            </div>
          </div>
        )}

        {page.type === 'backcover' && (
          <div className="book-page page-backcover">
            <div className="backcover-content">
              <div className="backcover-stars">{page.illustration}</div>
              <h3 className="backcover-title">{page.title}</h3>
              <p className="backcover-body">{page.text}</p>
              <div className="backcover-seal">{page.badge}</div>

              <button
                className="retro-btn reread-btn"
                onClick={() => goToPage(0)}
                aria-label="Read from beginning"
              >
                ↺ Read From Beginning
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Book Controls & Page Indicator */}
      <div className="storybook-toolbar">
        <button
          className="retro-btn page-nav-btn"
          onClick={prevPage}
          disabled={currentPage === 0}
          aria-label="Previous storybook page"
        >
          ◀ Prev
        </button>

        <div className="page-indicator-dots" role="tablist">
          {STORY_PAGES.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === currentPage}
              aria-label={`Go to page ${i + 1}`}
              className={`page-dot ${i === currentPage ? 'active-dot' : ''}`}
              onClick={() => goToPage(i)}
            />
          ))}
        </div>

        <button
          className="retro-btn page-nav-btn"
          onClick={nextPage}
          disabled={currentPage === totalPages - 1}
          aria-label="Next storybook page"
        >
          Next ▶
        </button>
      </div>

      <div className="storybook-tip">
        <small>💡 Tip: Use keyboard [←] and [→] arrow keys, or swipe on mobile to turn pages!</small>
      </div>
    </div>
  );
}
