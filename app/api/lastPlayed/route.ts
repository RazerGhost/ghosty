import { NextRequest, NextResponse } from "next/server";
import { setLastPlayedSong, getLastPlayedSong } from "@/lib/lastPlayed";

export async function POST(req: NextRequest) {
  const { song } = await req.json();
  if (!song) return NextResponse.json({ error: "Missing song" }, { status: 400 });

  await setLastPlayedSong(song);
  return NextResponse.json({ success: true });
}

export async function GET() {
  const song = await getLastPlayedSong();
  return NextResponse.json({ song });
}
