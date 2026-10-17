// Vercel Serverless Function: /api/guestbook
// Integrates with Upstash Redis REST API with robust rate limiting & offline fallback

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

// In-memory cache fallback for development / serverless lifetime
let memoryWishes = [
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
  }
];

const ipRateLimits = new Map();

function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const BAD_WORDS = ['hate', 'ugly', 'stupid', 'curse', 'kill', 'die', 'bad'];

function filterBadWords(str) {
  let clean = str;
  BAD_WORDS.forEach((w) => {
    const reg = new RegExp(`\\b${w}\\b`, 'gi');
    clean = clean.replace(reg, '***');
  });
  return clean;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Fetch recent wishes
  if (req.method === 'GET') {
    if (UPSTASH_URL && UPSTASH_TOKEN) {
      try {
        const response = await fetch(`${UPSTASH_URL}/lrange/pip_wishes/0/40`, {
          headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
        });
        const data = await response.json();
        if (data && Array.isArray(data.result) && data.result.length > 0) {
          const parsed = data.result.map((item) => {
            try {
              return typeof item === 'string' ? JSON.parse(item) : item;
            } catch {
              return null;
            }
          }).filter(Boolean);
          return res.status(200).json({ wishes: parsed });
        }
      } catch (err) {
        console.warn('Upstash fetch error, using memory fallback', err);
      }
    }
    return res.status(200).json({ wishes: memoryWishes });
  }

  // POST: Add new wish
  if (req.method === 'POST') {
    // 1. IP Rate Limiting (1 post / 20 seconds)
    const clientIp = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'local-user';
    const now = Date.now();
    const lastPost = ipRateLimits.get(clientIp) || 0;

    if (now - lastPost < 20000) {
      const waitSec = Math.ceil((20000 - (now - lastPost)) / 1000);
      return res.status(429).json({ error: `Please wait ${waitSec}s before posting again!` });
    }

    // 2. Validate Input
    const body = req.body || {};
    let rawName = typeof body.name === 'string' ? body.name.trim() : '';
    let rawMsg = typeof body.message === 'string' ? body.message.trim() : '';
    let icon = typeof body.icon === 'string' ? body.icon.slice(0, 4) : '✨';

    if (rawName.length < 2 || rawName.length > 20) {
      return res.status(400).json({ error: 'Name must be between 2 and 20 characters.' });
    }
    if (rawMsg.length < 3 || rawMsg.length > 140) {
      return res.status(400).json({ error: 'Message must be between 3 and 140 characters.' });
    }

    // 3. Filter & Escape
    const cleanName = escapeHtml(filterBadWords(rawName));
    const cleanMsg = escapeHtml(filterBadWords(rawMsg));

    const dateStr = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const newWish = {
      id: `wish-${now}-${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      icon,
      message: cleanMsg,
      date: dateStr
    };

    ipRateLimits.set(clientIp, now);
    memoryWishes.unshift(newWish);
    if (memoryWishes.length > 50) memoryWishes.pop();

    // 4. Save to Upstash if configured
    if (UPSTASH_URL && UPSTASH_TOKEN) {
      try {
        await fetch(`${UPSTASH_URL}/lpush/pip_wishes/${encodeURIComponent(JSON.stringify(newWish))}`, {
          headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
        });
      } catch (err) {
        console.warn('Upstash push error', err);
      }
    }

    return res.status(200).json({ success: true, wish: newWish });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
