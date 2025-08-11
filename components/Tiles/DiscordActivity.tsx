"use client";

import * as React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Skeleton } from "@heroui/skeleton";
import { Avatar } from "@heroui/avatar";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { activitiesOfType } from "@/types/lanyard";
import { GetUserData, ExtractLink } from "@/lib/lanyard";
import { msToClock } from "@/lib/helpers";

type ChipColor = "success" | "warning" | "danger" | "default";
const STATUS_MAP: Record<string, { color: ChipColor; text: string }> = {
    online: { color: "success", text: "Online" },
    idle: { color: "warning", text: "Idle" },
    dnd: { color: "danger", text: "Do Not Disturb" },
    offline: { color: "default", text: "Offline" },
};

export function DiscordActivityTile({
    card = "",
    header = "",
    body = "",
    size = "",
}: { card?: string; header?: string; body?: string; size?: string }) {
    const { loading, status } = GetUserData();

    // derive safely even while loading
    const userStatus = status?.discord_status ?? "offline";
    const { color: statusColor, text: statusText } =
        STATUS_MAP[userStatus] ?? STATUS_MAP.offline;

    const activities = status?.activities ?? [];
    const custom = activitiesOfType(activities, 4)[0];
    const playing = activitiesOfType(activities, 0); // array
    console.log(playing);

    if (loading || !status) return <TileSkeleton />;

    const wash =
        statusColor === "success"
            ? "from-emerald-500/10"
            : statusColor === "warning"
                ? "from-amber-500/10"
                : statusColor === "danger"
                    ? "from-rose-500/10"
                    : "from-foreground/5";

    return (
        <Card className={`${size} ${card} relative overflow-hidden`}>
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${wash} to-transparent`} />

            <CardHeader className={`${header} flex items-center justify-between relative z-10`}>
                <div className="flex items-center gap-2">
                    <DiscordLogoIcon />
                    <span className="text-sm font-medium">Discord Activity</span>
                </div>
                <Chip size="sm" variant="flat" color={statusColor}>{statusText}</Chip>
            </CardHeader>

            <CardBody className={`${body} relative z-10 flex flex-col gap-3`}>
                {custom?.state && (
                    <div className="inline-flex w-fit items-center gap-2 rounded-md border border-foreground/10 px-2 py-1 text-xs">
                        {custom.emoji?.name ? <span>{custom.emoji.name}</span> : null}
                        <span className="truncate max-w-[220px] md:max-w-none">{custom.state}</span>
                    </div>
                )}

                {playing.length > 0 ? (
                    <div className="flex flex-col gap-2">
                        {playing.map((act) => (
                            <PlayingRow key={act.id ?? `${act.name}-${act.created_at}`} act={act} />
                        ))}
                    </div>
                ) : (
                    <div className="h-16 grid place-items-center text-xs text-foreground/60 border border-foreground/10 rounded-xl">
                        No active game or app
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

/* Child component: all hooks live here (not inside a loop) */
function PlayingRow({
    act,
}: {
    act: {
        id?: string;
        name?: string;
        details?: string;
        state?: string;
        assets?: { large_image?: string | null };
        timestamps?: { start?: number; end?: number };
    };
}) {
    const playingAsset = React.useMemo(() => {
        const id = act.assets?.large_image;
        return id ? ExtractLink(id, "github") || null : null;
    }, [act.assets?.large_image]);
    console.log(act)

    const start = act.timestamps?.start ?? null;
    const end = act.timestamps?.end ?? null;

    // clock tick
    const [now, setNow] = React.useState(() => Date.now());
    React.useEffect(() => {
        if (!start) return; // tick if we have a start (end optional)
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, [start]);

    // elapsed + (optional) progress
    const elapsed = start ? Math.max(0, now - start) : 0;
    const total = start && end ? end - start : 0;
    const pos = start && end ? Math.min(now, end) - start : 0;
    const pct = total > 0 ? Math.max(0, Math.min(100, (pos / total) * 100)) : 0;

    return (
        <div className="flex items-center gap-3 rounded-xl border border-foreground/10 p-2.5 hover:border-foreground/20 transition">
            <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg overflow-hidden bg-foreground/10 shrink-0">
                {playingAsset ? (
                    <img src={playingAsset} alt={act.name || "App"} className="w-full h-full object-cover" />
                ) : (
                    <Avatar
                        name={act.name || "?"}
                        isBordered
                        radius="lg"
                        classNames={{ base: "w-full h-full rounded-lg", name: "text-xs" }}
                    />
                )}
            </div>

            <div className="min-w-0 flex-1">
                <div className="text-[11px] text-foreground/60">Playing</div>
                <div className="text-sm font-semibold truncate">{act.name || "Unknown app"}</div>
                {act.details ? (
                    <div className="text-xs text-foreground/60 truncate">{act.details}</div>
                ) : act.state ? (
                    <div className="text-xs text-foreground/60 truncate">{act.state}</div>
                ) : null}

                {/* If we only have a start: show a live timer. If we also have end: show progress bar. */}
                {start && !end ? (
                    <div className="mt-2 flex items-center gap-2 text-[10px] text-foreground/60">
                        <span
                            className="inline-block h-1.5 w-1.5 rounded-full bg-foreground/60 animate-pulse"
                            aria-hidden
                        />
                        <span>{msToClock(elapsed)}</span>
                    </div>
                ) : total > 0 ? (
                    <div className="mt-2">
                        <div className="h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
                            <div className="h-full rounded-full bg-foreground/40" style={{ width: `${pct}%` }} />
                        </div>
                        <div className="mt-1 flex justify-between text-[10px] text-foreground/60">
                            <span>{msToClock(pos)}</span>
                            <span>{msToClock(total)}</span>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

function TileSkeleton() {
    return (
        <Card className="col-span-12 md:col-span-4">
            <CardHeader className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <DiscordLogoIcon />
                    <span className="text-sm font-medium">Discord Activity</span>
                </div>
            </CardHeader>
            <CardBody className="flex flex-col gap-3">
                <Skeleton className="h-4 w-1/2 rounded" />
                <div className="flex items-center gap-3">
                    <Skeleton className="h-12 w-12 rounded-lg" />
                    <div className="flex-1 space-y-2">
                        <Skeleton className="h-4 w-1/2 rounded" />
                        <Skeleton className="h-3 w-2/3 rounded" />
                        <Skeleton className="h-2 w-full rounded" />
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
