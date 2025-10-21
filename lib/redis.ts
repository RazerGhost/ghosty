import { createClient } from 'redis';

let client: ReturnType<typeof createClient> | null = null;

export function getRedis() {
  if (!client) {
    client = createClient({ url: process.env.ghosty_REDIS_URL });
    client.on('error', (err) => console.error('Redis Client Error', err));
    // Connect asynchronously when first used. We intentionally don't await here
    // so callers can issue commands which will be queued until connected.
    client.connect().catch((err) => console.error('Redis connect error', err));
  }
  return client;
}
