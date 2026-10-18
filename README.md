# 🌙 Pip's Bedtime Homepage
### *Track 1: "Same Baby, 1,000 Websites" · haX.baby Hackathon (17–19 October 2026)*

> **"I build the dreams you fall asleep inside."**  
> *Pip · Junior Dream Engineer at the Midnight Nursery*

Welcome to **Pip's Bedtime Homepage**, a creative, deployed-ready character portfolio combining nostalgic **90s early-web soul** with modern frontend craft, interactive Web Audio synthesis, vector eye-tracking, and cozy midnight nursery aesthetics.

---

## 🌟 Live Preview & Features Breakdown

### 1. Character Canon (Pip)
- **Identity:** A baby with a smooth, round skull face, huge soft eye sockets with cozy glowing pinpricks of light, a tiny crooked smile, and a bedtime nightcap with stars and a little pink ribbon. Cute and friendly, never scary or gory.
- **Job:** Junior Dream Engineer at Midnight Nursery.
- **Personality:** Curious, sleepy, a little clumsy, easily delighted, giggles at everything, **hates silence**.
- **Immersion:** Pip’s vector eyes smoothly track the cursor/pointer. Clicking Pip triggers a friendly giggle sound effect and bouncing floating hearts.

### 2. The 4 Showcase Projects (What Pip Does)
1. **Lullaby Lab:** A playable music box powered by the in-browser **Web Audio API**. Includes 8 pentatonic chime keys (`C`, `D`, `E`, `G`, `A`, `C²`, `D²`, `E²`), keyboard hotkeys `[1]`–`[8]`, an animated golden winding key, timbre selector (*Golden Music Box*, *Crystal Chimes*, *Dream Harp*), and a generator that auto-plays Pip’s soothing bedtime melody.
2. **Nightlight Collection:** A bedside lantern showroom featuring the official *Porcelain Moon Lantern*, *Firefly Stardust Jar*, *Sleepy Cloud Lamp*, and *Bioluminescent Spore Cap*. Includes real-time ambient room brightness control (10% to 100%), spectral color tint switching, and individual power switches.
3. **Dream Delivery Routes:** An interactive SVG flight map tracking Pip's flight across midnight chimneys and rooftops. Includes an interactive route scrubber, play/pause delivery run autopilot, animated dashed flight progress trail, and 4 station logs.
4. **Bedtime Storybook:** Pip’s illustrated bedtime picture book, *"The Boy Who Lost His Yawn"*. Features realistic page-turn animations, keyboard arrow navigation (`←` / `→`), mobile touch swipe gestures, and bookmark tracking.

### 3. Story: 5 Interactive Chronological Scenes
- **Act I: The Cold Silence** — Pip hates silence; the nursery clock ticks too loudly.
- **Act II: Brewing the Lullaby** — Steaming fallen stardust & lavender in the copper kettle.
- **Act III: Packing the Cloud Basket** — Loading 40 sweet dream flasks into the wicker cradle.
- **Act IV: Rooftop Delivery Run** — Floating low over damp shingles and dropping lavender cloud puffs into chimneys.
- **Act V: Sweet Slumber Falls** — The whole valley sleeps soundly; Pip curls into a star hammock for a nap.

### 4. Tier 1, Tier 2 & Side Quests (+13 Bonus Points)
- **Day / Night Mood Toggle:** Toggles between *Midnight Work Mode* (deep starlit blue, active eye tracking) and *Morning Slumber Mode* (soft lavender dawn, sleepy closed eyes, nap status), persisted in `localStorage`.
- **Dream Flashlight Mode:** Interactive dark mask revealing hidden nursery constellations, secret stickers, and dream frequencies with cursor or touch dragging.
- **Sparkle Cursor Trail (+2):** Stardust sparkles following the pointer (respects `prefers-reduced-motion`).
- **Hit Counter Odometer (+1):** Retro 6-digit mechanical roll-over odometer tracking dreams delivered, with interactive "+1 Dream Delivered" button and sound.
- **Click Sounds with Visible MUTE Switch (+3):** Pure Web Audio API synthesis (zero external MP3 dependencies). Audio never autoplays; mute toggle is prominent in the top tray.
- **Live Dream Guestbook (+2):** Vercel serverless function (`/api/guestbook`) with Upstash Redis REST support, input validation, 20s rate limiting, and instant `localStorage` offline fallback.
- **Hidden Easter Egg:** Tapping the crescent moon 3 times triggers an audio fanfare and reveals Pip’s secret dream recipe modal.

---

## 🚀 Quickstart: Install & Run Locally

### Prerequisites
- **Node.js** (v18 or newer)
- **npm** (v9 or newer)

### Commands
```bash
# 1. Navigate to the project directory
cd pips-bedtime-homepage

# 2. Install dependencies (plain React + Vite, minimal footprint)
npm install

# 3. Start local development server
npm run dev
```

Open your browser to: **`http://localhost:5173`**

To test a production build:
```bash
npm run build
npm run preview
```

---

## 🐙 How to Push to GitHub

To submit your project for the hackathon, push this repository to your public GitHub account:

```bash
# 1. Create a new public repository on GitHub named "pips-bedtime-homepage"
# (Do NOT initialize with a README, .gitignore, or license)

# 2. Add your GitHub remote URL
git remote add origin https://github.com/shravani-162006/pips-bedtime-homepage.git

# 3. Rename branch to main
git branch -M main

# 4. Push all commits
git push -u origin main
```

> **Tip for Hackathon History:** Commit small changes between **17–19 October 2026** to show your development timeline!

---

## ☁️ How to Deploy on Vercel with Upstash Redis

This project is pre-configured with `vercel.json` and zero-config serverless API routes.

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
2. Import your GitHub repository `pips-bedtime-homepage`.
3. Framework Preset: **Vite** (auto-detected).
4. Click **Deploy**.

### Step 2: Connect Free Upstash Redis (for Persistent Guestbook & Counter)
1. Go to [console.upstash.com](https://console.upstash.com) (free tier).
2. Click **Create Database**, select **Global** or your closest region, and choose Redis.
3. In your database dashboard, scroll to **REST API** section and copy:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
4. In your Vercel Project Settings → **Environment Variables**, add:
   - `UPSTASH_REDIS_REST_URL` = `https://your-database-name.upstash.io`
   - `UPSTASH_REDIS_REST_TOKEN` = `your_upstash_secret_token`
5. Click **Redeploy**.

> **Note:** If you don't add the environment variables, the site **will not break**! It automatically falls back to `localStorage` and memory caching with pre-seeded community wishes.

---

## 🎨 File Guide: Where to Customize

| What You Want to Change | File Path | Description |
| :--- | :--- | :--- |
| **Colors & Palette** | [`src/index.css`](src/index.css) | Edit `--bg-deep`, `--accent-lavender`, `--accent-pink`, `--accent-gold`, and `.theme-day` variables. |
| **Pip's Bio & Quirks** | [`src/components/PipBioWindow.jsx`](src/components/PipBioWindow.jsx) | Edit tagline, sleepiness index, favorite snacks, and nursery assignment. |
| **Pip's Vector Art** | [`src/components/PipAvatar.jsx`](src/components/PipAvatar.jsx) | Modify skull shape, nightcap stars, glowing eyes, or smile path. |
| **Lullaby Notes** | [`src/components/projects/LullabyLab.jsx`](src/components/projects/LullabyLab.jsx) | Add or change musical scales and melody sequences. |
| **Nightlight Specs** | [`src/components/projects/NightlightCollection.jsx`](src/components/projects/NightlightCollection.jsx) | Edit lamp names, power sources, and blueprint field notes. |
| **Storybook Text** | [`src/components/projects/BedtimeStorybook.jsx`](src/components/projects/BedtimeStorybook.jsx) | Customize chapters of *"The Boy Who Lost His Yawn"*. |
| **Story Scenes** | [`src/components/StoryScenes.jsx`](src/components/StoryScenes.jsx) | Update the 5-act origins narrative and scene illustrations. |
| **Sound Frequencies** | [`src/utils/audio.js`](src/utils/audio.js) | Adjust harmonics, synth envelopes, or chime frequencies. |
| **Easter Egg Secret** | [`src/components/SecretModal.jsx`](src/components/SecretModal.jsx) | Change the unlocked secret recipe and explorer badge. |

---

## 📖 Submission Story: "The Story Behind the Build"
*(Copy & paste or adapt this write-up for your official hackathon submission)*

> **Title:** Engineering Dreams from the Midnight Nursery  
> **Track:** Track 1 ("Same Baby, 1,000 Websites" · Pip)  
>
> When reading the prompt for Pip, one phrase resonated deeply: *"Hates silence."* For a baby with a skull face working the midnight shift in a nursery, silence isn't just quiet—it's heavy and cold. That single character quirk sparked our concept: what if Pip didn't just design dreams, but built a warm, noisy, tactile homepage from the golden age of the 90s web? A cozy digital blanket made of desktop windows, mechanical chime boxes, glowing porcelain lanterns, and interactive starlight.
>
> To make Pip feel truly alive, we avoided generic modern landing-page cards and built an interactive vector avatar whose soft glowing pinpricks track your cursor wherever you look, giggling with floating hearts when tapped. For Pip’s inventions, we developed a real Web Audio music-box synthesizer with pentatonic bells that visitors can play using number keys, a bedside lantern collection with ambient room illumination, an animated rooftop delivery route, and an interactive page-turning bedtime storybook (*"The Boy Who Lost His Yawn"*).
>
> Balancing nostalgic early-web whimsy with modern craft was our proudest achievement: 90s window beveled frames, mechanical odometer counters, and webrings exist alongside mobile-tested responsive layouts, `prefers-reduced-motion` compliance, and an offline-resilient serverless guestbook. Pip reminds us that the best websites aren't sterile corporate portals—they are playful, kind little corners of the web where anyone can curl up and fall asleep inside a sweet dream.

---

## 📜 Credits & Attributions
- **Character Concept & Lore:** haX.baby ("Baby's First Website" Hackathon, Track 1: Pip).
- **Official 3D Assets:** haX.baby Track 1 Creator Asset Pack (`pip_portrait.png`, `pip_dream_lantern.png`, `pip_lullaby_box.png`, `pip_avatar_cloud.png`, `pip.jpg`).
- **Interactive Art:** Custom SVG vector Pip avatar and animation created specifically for this build.
- **Typography:** Google Fonts (*Fredoka*, *Silkscreen*, *Quicksand*, *Caveat*).
- **Sound Synthesis:** Built with the HTML5 Web Audio API. Zero external audio downloads.
- **Disclaimer:** This website is a fan-made submission created for the haX.baby hackathon and is not officially affiliated with or endorsed by haX.baby.
