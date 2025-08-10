"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Progress } from "@heroui/progress";
import { AudioLines, Disc3, Pause } from "lucide-react";
import { activitiesOfType } from "@/types/lanyard";
import { GetUserData as _GetUserData } from "@/lib/lanyard";
import { useEffect, useState } from "react";
import { msToClock } from "@/lib/helpers";

// optional: alias to clarify it's a hook
const useUserData = _GetUserData;

export function NowPlayingTile({
    card = "",
    header = "",
    body = "",
}: {
    card?: string;
    header?: string;
    body?: string;
}) {
    // ✅ 1) Hooks: stable, top-level
    const { loading, status } = useUserData();

    // progress state (always declared)
    const [progress, setProgress] = useState(0);
    const [elapsed, setElapsed] = useState(0);
    const [duration, setDuration] = useState(0);

    // derive non-hook values
    const listening = status ? activitiesOfType(status.activities, 2)[0] : undefined;
    const spotify = status?.spotify;
    const start = spotify?.timestamps?.start ?? listening?.timestamps?.start;
    const end = spotify?.timestamps?.end ?? listening?.timestamps?.end;

    // ✅ 2) Effect depends only on primitives
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

    // early return AFTER hooks are declared
    if (loading || !status) return <TileSkeleton />;

    const song = spotify?.song ?? listening?.details ?? "Track not found";
    const artist = spotify?.artist ?? listening?.state ?? "Artist not found";
    const album = spotify?.album ?? "Album not found";
    const albumArt = spotify?.album_art_url;

    return (
        <Card className={`col-span-12 md:col-span-4 h-full flex flex-col ${card}`}>
            <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
                <Disc3 size={80} />
            </div>
            <CardBody className={` ${body} justify-center overflow-hidden`}>
                <div className="flex items-center gap-4">
                    {/* Album Art (25%) */}
                    <div
                        className="basis-1/4 aspect-square rounded-xl overflow-hidden bg-foreground/10"
                        aria-label="Album art"
                    >
                        {albumArt ? (
                            <img
                                src={albumArt}
                                alt={album || song}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center justify-center h-full w-full text-foreground/40">
                                <Disc3 size={32} className="mb-1" />
                                <span className="text-xs">No song playing</span>
                            </div>
                        )}
                    </div>

                    {/* Details (75%) */}
                    <div className="basis-3/4 min-w-0">
                        <p className="truncate font-medium text-[clamp(13px,2vw,15px)]">
                            {song ? <>{song}</> : null}
                            {artist ? <> — {artist}</> : null}
                        </p>
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
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

function TileSkeleton() {
    return (
        <Card className="col-span-12 md:col-span-4">
            <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <AudioLines size={18} />
                    <span className="text-sm font-medium">Now Playing</span>
                </div>
                <Chip size="sm" variant="flat">Loading...</Chip>
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-1/4" />
            </CardBody>
        </Card>
    );
}
