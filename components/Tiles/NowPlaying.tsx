"use client";

import { Card, CardBody } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Progress } from "@heroui/progress";
import { AudioLines, Disc3, Pause, ExternalLink, Copy } from "lucide-react";
import { activitiesOfType } from "@/types/lanyard";
import { GetUserData as _GetUserData } from "@/lib/lanyard";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
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

    const [progress, setProgress] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    const listening = status ? activitiesOfType(status.activities, 2)[0] : undefined;
    const spotify = status?.spotify;

    const start = spotify?.timestamps?.start ?? listening?.timestamps?.start;
    const end = spotify?.timestamps?.end ?? listening?.timestamps?.end;

    const isPlaying = !!(start && end && Date.now() < end);

    useEffect(() => {
        if (!start || !end) {
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
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, [start, end]);

    const song = spotify?.song ?? listening?.details ?? "Track not found";
    const artist = spotify?.artist ?? listening?.state ?? "Artist not found";
    const album = spotify?.album ?? "Album not found";
    const albumArt = spotify?.album_art_url ?? "";

    const trackUrl =
        spotify?.track_id
            ? `https://open.spotify.com/track/${spotify.track_id}`
            : undefined;
    const titleWrapRef = useRef<HTMLDivElement | null>(null);
    const [marquee, setMarquee] = useState(false);

    useLayoutEffect(() => {
        const el = titleWrapRef.current;
        if (!el) return;

        const check = () => {
            // child [data-line] holds the single non-wrapping line
            const line = el.querySelector<HTMLElement>("[data-line]");
            if (!line) return;
            setMarquee(line.scrollWidth > el.clientWidth + 2);
        };

        const ro = new ResizeObserver(check);
        ro.observe(el);

        // fonts can change metrics after first paint
        (document as any).fonts?.ready?.then?.(check);
        // one microtask later for good measure
        queueMicrotask(check);

        return () => ro.disconnect();
    }, [song, artist]);

    const titleText = `${artist} — ${song}`;

    if (loading || !status) return <TileSkeleton />;

    return (
        <Card className={`${size} h-full flex flex-col relative overflow-hidden ${card}`} >
            {/* Blurred background layer */}
            {albumArt && (
                <div
                    key={spotify?.track_id} // fade when track changes
                    className="absolute inset-0 bg-background/60 overflow-hidden rounded-2xl"
                    aria-hidden
                >
                    <div
                        className="absolute inset-0 bg-center bg-cover scale-110 blur-2xl transition-all duration-500"
                        style={{ backgroundImage: `url(${albumArt})` }}
                    />
                    <div className="absolute inset-0 bg-background/60" /> {/* overlay tint */}
                </div>
            )}

            <CardBody className={`${body} justify-center`}>
                <div className="flex items-center gap-4">
                    {/* 25% COVER with circular progress ring */}
                    <div className="basis-1/4 min-w-0">
                        <div className="relative aspect-square rounded-xl overflow-hidden bg-foreground/10">
                            {/* ring */}
                            <div
                                className="absolute inset-0 rounded-xl"
                                style={{
                                    // conic ring using current progress
                                    background: `conic-gradient(hsl(var(--foreground)) ${progress}%, transparent 0)`,
                                    mask:
                                        "radial-gradient(circle at center, transparent 58%, black 60%), linear-gradient(black,black)",
                                    WebkitMaskComposite: "xor",
                                    maskComposite: "exclude" as any,
                                }}
                                aria-hidden
                            />
                            {albumArt ? (
                                <img src={albumArt} alt={album || song} className={`w-full h-full object-cover`} />
                            ) : (
                                <div className="flex flex-col items-center justify-center h-full w-full text-foreground/40">
                                    {isPlaying ? <Disc3 size={32} /> : <Pause size={28} />}
                                    <span className="text-[10px] mt-1">{isPlaying ? "Playing" : "Paused"}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* 75% DETAILS */}
                    <div className="basis-3/4 min-w-0">
                        <div
                            ref={titleWrapRef}
                            className="min-w-0 flex-1 overflow-hidden"
                            title={titleText}
                        >
                            {marquee ? (
                                <div className="relative w-full overflow-hidden">
                                    <div className="flex whitespace-nowrap will-change-transform animate-marquee">
                                        <span data-line className="pr-8 font-medium text-[clamp(13px,2vw,15px)]">
                                            {titleText}
                                        </span>
                                        {/* duplicate for seamless loop */}
                                        <span aria-hidden className="pr-8 font-medium text-[clamp(13px,2vw,15px)]">
                                            {titleText}
                                        </span>
                                    </div>
                                    {/* optional: soft edge masks (looks nicer) */}
                                    <div className="pointer-events-none absolute inset-y-0 left-0 w-4 " />
                                    <div className="pointer-events-none absolute inset-y-0 right-0 w-4 " />
                                </div>
                            ) : (
                                <p data-line className="truncate font-medium text-[clamp(13px,2vw,15px)]">
                                    {titleText}
                                </p>
                            )}
                        </div>

                        {album ? (
                            <p className="text-[11px] md:text-xs text-foreground/60 truncate">{album}</p>
                        ) : null}

                        <div className="mt-2">
                            <Progress
                                value={progress}
                                className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden"
                                aria-label="Playback progress"
                            />
                            {duration > 0 ? (
                                <div className="mt-1 flex justify-between text-[10px] text-foreground/60">
                                    <span>{msToClock(elapsed)}</span>
                                    <span>{msToClock(duration)}</span>
                                </div>
                            ) : null}
                        </div>

                        {/* Actions (optional) */}
                        <div className="mt-2 flex items-center gap-2">
                            {trackUrl ? (
                                <a
                                    href={trackUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[11px] inline-flex items-center gap-1 opacity-80 hover:opacity-100"
                                >
                                    <ExternalLink size={12} /> Open
                                </a>
                            ) : null}
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

function TileSkeleton() {
    return (
        <Card className="col-span-12 md:col-span-4">
            <CardBody className="flex items-center gap-4">
                <div className="basis-1/4">
                    <Skeleton className="aspect-square rounded-xl" />
                </div>
                <div className="basis-3/4 flex-1 space-y-2">
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-3 w-1/2" />
                    <Skeleton className="h-2 w-full" />
                </div>
            </CardBody>
        </Card>
    );
}
