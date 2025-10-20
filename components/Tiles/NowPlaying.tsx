"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Progress } from "@heroui/progress";
import { Disc3, Pause, ExternalLink } from "lucide-react";
import { activitiesOfType, Spotify } from "@/types/lanyard";
import { GetUserData as _GetUserData } from "@/lib/lanyard";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { msToClock } from "@/lib/helpers";

const useUserData = _GetUserData;

export function NowPlayingTile({
    card = "",
    header = "",
    body = "",
    size = "",
}: {
    card?: string;
    header?: string;
    body?: string;
    size?: string;
}) {
    const { loading, status } = useUserData();
    const [spotifyData, setSpotifyData] = useState<Spotify | null>(null);
    const lastKnownSpotifyRef = useRef<Spotify | null>(null);

    // Fetch last played on mount, only if not cached
    useEffect(() => {
        if (lastKnownSpotifyRef.current) return;
        const fetchLastPlayed = async () => {
            try {
                const res = await fetch("/api/lastPlayed");
                const data = await res.json();
                setSpotifyData(data.song);
            } catch (err) {
                console.error("Failed to fetch last played song:", err);
            }
        };
        fetchLastPlayed();
    }, []);

    const prevSpotifySnapshotRef = useRef<Spotify | null>(null);
    const listening = status ? activitiesOfType(status.activities, 2)[0] : undefined;
    const spotify = status?.spotify as Spotify | undefined;

    const song = spotify?.song ?? spotifyData?.song ?? listening?.details;
    const artist = spotify?.artist ?? spotifyData?.artist ?? listening?.state;
    const album = spotify?.album ?? spotifyData?.album;
    const albumArt = spotify?.album_art_url ?? spotifyData?.album_art_url ?? null;
    const trackId = spotify?.track_id ?? spotifyData?.track_id ?? null;
    const trackUrl = trackId ? `https://open.spotify.com/track/${trackId}` : undefined;
    const start =
        spotify?.timestamps?.start ??
        spotifyData?.timestamps?.start ??
        listening?.timestamps?.start;
    const end =
        spotify?.timestamps?.end ??
        spotifyData?.timestamps?.end ??
        listening?.timestamps?.end;

    // update last known track to the current live spotify track
    useEffect(() => {
        const incomingId = spotify?.track_id ?? null;
        const currentId = spotifyData?.track_id ?? null;

        if (spotify) {
            lastKnownSpotifyRef.current = spotify;
            if (incomingId !== currentId) {
                setSpotifyData(spotify);
            }
        }
    }, [spotify, spotifyData?.track_id]);

    const [progress, setProgress] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    const [wasLive, setWasLive] = useState(false);
    // if spotify isn't live anymore, freeze the data
    useEffect(() => {
        const isLive = !!spotify;

        if (wasLive && !isLive) {
            const last = lastKnownSpotifyRef.current;
            if (last) {
                const now = Date.now();
                const pausedElapsed = elapsed;
                const pausedDuration =
                    duration ||
                    (last.timestamps?.end
                        ? last.timestamps.end - (last.timestamps.start ?? 0)
                        : 0);
                const pausedSnapshot: Spotify = {
                    ...last,
                    timestamps: {
                        start: now - pausedElapsed,
                        end: now - pausedElapsed + pausedDuration,
                    },
                };
                setSpotifyData(pausedSnapshot);
            }
        }

        setWasLive(isLive);
    }, [spotify, elapsed, duration, wasLive]);

    const isPlaying = !!(spotify && start && end && Date.now() < end);

    // Update playback progress
    useEffect(() => {
        if (!start || !end || end <= start) {
            setProgress(0);
            setElapsed(0);
            setDuration(0);
            return;
        }

        const total = end - start;
        const update = () => {
            const now = Date.now();
            const pos = Math.min(now, end) - start;
            const pct = Math.max(0, Math.min(100, (pos / total) * 100));
            setElapsed(pos);
            setDuration(total);
            setProgress(pct);
        };
        // update immediately and every second if spotify is live
        if (spotify) {
            update();
            const id = setInterval(update, 1000);
            return () => clearInterval(id);
        }
    }, [start, end, spotify]);

    // Marquee logic
    const titleWrapRef = useRef<HTMLDivElement | null>(null);
    const [marquee, setMarquee] = useState(false);
    // ai coded
    useLayoutEffect(() => {
        const el = titleWrapRef.current;
        if (!el) return;

        const check = () => {
            const line = el.querySelector<HTMLElement>("[data-line]");
            if (!line) return;
            setMarquee(line.scrollWidth > el.clientWidth + 2);
        };

        const ro = new ResizeObserver(check);
        ro.observe(el);
        (document as any).fonts?.ready?.then?.(check);
        queueMicrotask(check);

        return () => ro.disconnect();
    }, [song, artist]);

    const titleText = `${artist} — ${song}`;

    // Persist last played song
    useEffect(() => {
        const prev = prevSpotifySnapshotRef.current;
        const curr = spotify ?? null;

        const shouldPersist = prev && (!curr || prev.track_id !== curr.track_id);

        if (shouldPersist) {
            (async () => {
                try {
                    await fetch("/api/lastPlayed", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ song: prev }),
                    });
                } catch (err) {
                    console.error("Failed to persist last played:", err);
                }
            })();
        }

        prevSpotifySnapshotRef.current = curr;
    }, [spotify]);

    // Memoized formatted time strings
    const [elapsedStr, durationStr] = useMemo(() => {
        return [msToClock(elapsed), msToClock(duration)];
    }, [elapsed, duration]);

    return (
        <Card
            className={`${size} h-full flex flex-col relative overflow-hidden ${card}`}
        >
            {albumArt && (
                <div
                    key={spotify?.track_id}
                    className="absolute inset-0 bg-background/60 overflow-hidden rounded-2xl"
                    aria-hidden
                >
                    <div
                        className="absolute inset-0 bg-center bg-cover scale-110 blur-2xl transition-all duration-500"
                        style={{ backgroundImage: `url(${albumArt})` }}
                    />
                    <div className="absolute inset-0 bg-background/60" />
                </div>
            )}

            <CardHeader
                className={`${header} px-4 pt-3 text-[12px] text-foreground/60`}
            >
                {wasLive ? "Now Playing" : "Last Played"}
            </CardHeader>

            <CardBody className={`${body} justify-center`}>
                <div className="flex items-center gap-4">
                    {/* COVER */}
                    <div className="basis-1/4 min-w-0">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-foreground/10">
                            <div
                                className="absolute inset-0 rounded-xl"
                                style={{
                                    background: `conic-gradient(hsl(var(--foreground)) ${progress}%, transparent 0)`,
                                    mask: "radial-gradient(circle at center, transparent 58%, black 60%), linear-gradient(black,black)",
                                    WebkitMaskComposite: "xor",
                                    maskComposite: "exclude" as any,
                                }}
                                aria-hidden
                            />
                            {albumArt ? (
                                <img
                                    src={albumArt}
                                    alt={album || song}
                                    className={`w-full h-full object-cover ${!isPlaying ? "opacity-80 grayscale" : ""
                                        }`}
                                />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full w-full text-foreground/40">
                                    {isPlaying ? <Disc3 size={32} /> : <Pause size={28} />}
                                    <span className="text-[10px] mt-1">
                                        {isPlaying ? "Playing" : "Paused"}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* DETAILS */}
                    <div className="basis-3/4 min-w-0">
                        <div
                            ref={titleWrapRef}
                            className="min-w-0 flex-1 overflow-hidden"
                            title={titleText}
                        >
                            {marquee ? (
                                <div className="relative w-full overflow-hidden">
                                    <div className="flex whitespace-nowrap will-change-transform animate-marquee">
                                        <span
                                            data-line
                                            className="pr-8 font-medium text-[clamp(13px,2vw,15px)]"
                                        >
                                            {titleText}
                                        </span>
                                        <span
                                            aria-hidden
                                            className="pr-8 font-medium text-[clamp(13px,2vw,15px)]"
                                        >
                                            {titleText}
                                        </span>
                                    </div>
                                </div>
                            ) : (
                                <p
                                    data-line
                                    className="truncate font-medium text-[clamp(13px,2vw,15px)]"
                                >
                                    {titleText}
                                </p>
                            )}
                        </div>

                        {album ? (
                            <p className="text-[11px] md:text-xs text-foreground/60 truncate">
                                {album}
                            </p>
                        ) : null}

                        <div className="mt-2">
                            <Progress
                                value={progress}
                                className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden"
                                aria-label="Playback progress"
                            />
                            {duration > 0 ? (
                                <div className="mt-1 flex justify-between text-[10px] text-foreground/60">
                                    <span>{elapsedStr}</span>
                                    <span>{durationStr}</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-2 flex items-center gap-2">
                            {trackId && (
                                <a
                                    href={trackUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] inline-flex items-center gap-1 opacity-80 hover:opacity-100"
                                >
                                    <ExternalLink size={12} /> Open
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
