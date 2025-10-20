import redis from "./redis";

export async function setLastPlayedSong(song: unknown) {
  const value = typeof song === "string" ? song : JSON.stringify(song);
  await redis.set("lastPlayedSong", value);
}

export async function getLastPlayedSong() {
  const val = await redis.get("lastPlayedSong");
  if (val === null) return null;

  try {
    return JSON.parse(val);
  } catch (e) {
    return val;
  }
}
