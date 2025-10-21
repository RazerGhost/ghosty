import { getRedis } from "./redis";

export async function setLastPlayedSong(song: unknown) {
  const redis = getRedis();
  const value = typeof song === "string" ? song : JSON.stringify(song);
  await redis.set("lastPlayedSong", value);
}

export async function getLastPlayedSong() {
  const redis = getRedis();
  const val = await redis.get("lastPlayedSong");
  if (val === null) return null;

  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}
