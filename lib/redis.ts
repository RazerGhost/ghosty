import { createClient } from 'redis';

const redis = createClient({
  url: process.env.ghosty_REDIS_URL, // e.g., redis://localhost:6379 or Vercel Redis URL
});

redis.on('error', (err) => console.error('Redis Client Error', err));

redis.connect().catch(console.error);

export default redis;
