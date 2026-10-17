// Vercel Serverless Function: /api/counter
// Increments and fetches the "Dreams Delivered" hit-counter via Upstash Redis REST

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL;
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN;

let memoryCount = 14289;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // GET: Fetch count
  if (req.method === 'GET') {
    if (UPSTASH_URL && UPSTASH_TOKEN) {
      try {
        const response = await fetch(`${UPSTASH_URL}/get/pip_dream_counter`, {
          headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
        });
        const data = await response.json();
        if (data && data.result) {
          const count = parseInt(data.result, 10);
          if (!isNaN(count)) return res.status(200).json({ count: Math.max(count, 14289) });
        }
      } catch (err) {
        console.warn('Upstash counter error', err);
      }
    }
    return res.status(200).json({ count: memoryCount });
  }

  // POST: Increment count
  if (req.method === 'POST') {
    memoryCount += 1;
    let finalCount = memoryCount;

    if (UPSTASH_URL && UPSTASH_TOKEN) {
      try {
        const response = await fetch(`${UPSTASH_URL}/incr/pip_dream_counter`, {
          headers: { Authorization: `Bearer ${UPSTASH_TOKEN}` }
        });
        const data = await response.json();
        if (data && typeof data.result === 'number') {
          finalCount = Math.max(data.result, 14289);
        }
      } catch (err) {
        console.warn('Upstash incr error', err);
      }
    }

    return res.status(200).json({ count: finalCount, success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
