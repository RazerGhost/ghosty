"use client";

import * as React from "react";
import { Card, CardBody, CardHeader } from "@heroui/card";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from "embla-carousel-autoplay";

type Props = {
    card?: string;
    header?: string;
    body?: string;
    size?: string;
    lat?: number; // defaults: Almere
    lon?: number;
    city?: string;
};

type ApiResp = {
    meta: { timezone?: string };
    current: {
        tempC: number | null;
        feelsLikeC: number | null;
        humidity: number | null;
        isDay: boolean;
        weatherCode: number | null;
        windSpeedKph: number | null;
        windDirDeg: number | null;
    };
    hourly: {
        time: string[];
        temperature2m: (number | null)[];
        precipProb: (number | null)[];
        weatherCode: (number | null)[];
    };
    daily: {
        tMax: (number | null)[];
        tMin: (number | null)[];
        weatherCode: (number | null)[];
    };
};

export function WeatherMini({
    card = "",
    header = "",
    body = "",
    size = "",
    lat = 52.3508,
    lon = 5.2647,
    city = "Almere",
}: Props) {
    const [data, setData] = React.useState<ApiResp | null>(null);
    const [err, setErr] = React.useState<string | null>(null);
    const plugin = React.useRef(
        Autoplay({
            delay: 3000,
            stopOnInteraction: false, // ← don't permanently stop after a drag/click
            stopOnMouseEnter: true,   // ← pause on hover automatically
        })
    );
    const [emblaRef, embla] = useEmblaCarousel(
        { loop: true, align: "start", dragFree: false, skipSnaps: false },
        [plugin.current]
    );

    React.useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const r = await fetch(`/api/weather?lat=${lat}&lon=${lon}`, { cache: "no-store" });
                if (!r.ok) throw new Error(`HTTP ${r.status}`);
                const j: ApiResp = await r.json();
                if (alive) setData(j);
            } catch (e: any) {
                if (alive) setErr(e.message ?? "Failed");
            }
        })();
        return () => { alive = false; };
    }, [lat, lon]);

    const c = data?.current;
    const h = data?.hourly;
    const d = data?.daily;

    const tNow = c?.tempC ?? null;
    const tMax = d?.tMax?.[0] ?? null;
    const tMin = d?.tMin?.[0] ?? null;
    const feels = c?.feelsLikeC ?? null;
    const humid = c?.humidity ?? null;
    const wind = c?.windSpeedKph ?? null;
    const wCode = c?.weatherCode ?? null;

    // Compute next 24 hours preview
    const hoursShown = 24;
    const nextHours = React.useMemo(() => {
        if (!h?.time?.length) return [];
        return h.time.slice(0, hoursShown).map((iso, i) => ({
            time: new Date(iso),
            temp: h.temperature2m?.[i] ?? null,
            code: h.weatherCode?.[i] ?? null,
            pop: h.precipProb?.[i] ?? null,
        }));
    }, [h]);

    React.useEffect(() => {
        if (!embla || !data?.hourly?.time?.length) return;
        embla.reInit();
        setTimeout(() => { plugin.current.reset(); plugin.current.play(); }, 0);
    }, [embla, data?.hourly?.time?.length]);

    return (
        <Card
            role="region"
            aria-roledescription="carousel"
            aria-label="Hourly weather"
            className={`relative overflow-hidden ${size} ${card}`}
        >
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
            <CardHeader className={`pb-0 pt-3 px-3 md:px-4 ${header}`}>
                <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium">Weather</span>
                    <span className="text-[11px] opacity-70">{data?.meta?.timezone ?? ""}</span>
                </div>
            </CardHeader>

            <CardBody className={`pt-3 px-3 md:px-4 relative z-10 ${body}`}>
                {err ? (
                    <div className="text-xs text-foreground/60">Couldn’t load weather.</div>
                ) : !data ? (
                    <div className="h-16 rounded-xl bg-foreground/5 animate-pulse" />
                ) : (
                    <div className="space-y-3">
                        {/* Now */}
                        <div className="flex items-end justify-between">
                            <div className="min-w-0">
                                <div className="text-sm font-semibold truncate">{city}</div>
                                <div className="text-xs text-foreground/60 truncate">
                                    {labelForCode(wCode) ?? "—"}
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <WeatherGlyph code={wCode} isDay={Boolean(c?.isDay)} />
                                <span className="text-3xl font-semibold tabular-nums">
                                    {tNow != null ? Math.round(tNow) : "—"}°
                                </span>
                            </div>
                        </div>

                        {/* Stats row */}
                        <div className="flex flex-wrap gap-2 text-[11px]">
                            <Pill label="H" value={tMax != null ? `${Math.round(tMax)}°` : "—"} />
                            <Pill label="L" value={tMin != null ? `${Math.round(tMin)}°` : "—"} />
                            <Pill label="Feels" value={feels != null ? `${Math.round(feels)}°` : "—"} />
                            <Pill label="Humidity" value={humid != null ? `${Math.round(humid)}%` : "—"} />
                            <Pill label="Wind" value={wind != null ? `${Math.round(wind)} km/h` : "—"} />
                            <Pill
                                label="Rain"
                                value={
                                    nextHours.length
                                        ? `${Math.max(...nextHours.map(h => h.pop ?? 0))}%`
                                        : "—"
                                }
                            />
                        </div>

                        {nextHours.length ? (
                            <div className="overflow-hidden" ref={emblaRef}>
                                <div className="flex">
                                    {nextHours.map((x, i) => (
                                        <div
                                            key={i}
                                            className="shrink-0 w-[60px] p-2 text-center border border-foreground/10 rounded-lg mx-1"
                                        >
                                            <div className="text-[10px] opacity-70">
                                                {x.time.toLocaleTimeString(undefined, { hour: "2-digit" })}
                                            </div>
                                            <div className="my-0.5 flex justify-center">
                                                <WeatherGlyph code={x.code} isDay={true} size={14} />
                                            </div>
                                            <div className="text-[11px] tabular-nums">
                                                {x.temp != null ? Math.round(x.temp) : "—"}°
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : null}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

/* UI bits */
function Pill({ label, value }: { label: string; value: string }) {
    return (
        <span className="inline-flex items-center gap-1 rounded-md border border-foreground/10 px-2 py-[2px]">
            <span className="opacity-70">{label}</span>
            <span className="font-medium">{value}</span>
        </span>
    );
}

/* Tiny glyphs mapping for WMO weather codes */
function WeatherGlyph({ code, isDay, size = 18 }: { code: number | null | undefined; isDay: boolean; size?: number }) {
    const txt = glyphForCode(code, isDay);
    return <span style={{ fontSize: size, lineHeight: 1 }}>{txt}</span>;
}

function glyphForCode(code?: number | null, isDay = true): string {
    if (code == null) return "•";
    // WMO codes (very small set; extend as needed)
    if (code === 0) return isDay ? "☀️" : "🌙";
    if ([1, 2].includes(code)) return isDay ? "🌤️" : "☁️";
    if (code === 3) return "☁️";
    if ([45, 48].includes(code)) return "🌫️";
    if ([51, 53, 55, 61, 63, 65].includes(code)) return "🌧️";
    if ([80, 81, 82].includes(code)) return "🌦️";
    if ([71, 73, 75, 77, 85, 86].includes(code)) return "❄️";
    if ([95, 96, 99].includes(code)) return "⛈️";
    return "•";
}

function labelForCode(code?: number | null): string | null {
    if (code == null) return null;
    const map: Record<number, string> = {
        0: "Clear",
        1: "Mainly clear",
        2: "Partly cloudy",
        3: "Overcast",
        45: "Fog",
        48: "Depositing rime fog",
        51: "Light drizzle",
        53: "Drizzle",
        55: "Heavy drizzle",
        61: "Light rain",
        63: "Rain",
        65: "Heavy rain",
        71: "Snow",
        73: "Snow",
        75: "Heavy snow",
        77: "Snow grains",
        80: "Rain showers",
        81: "Rain showers",
        82: "Heavy showers",
        85: "Snow showers",
        86: "Heavy snow showers",
        95: "Thunderstorm",
        96: "Thunderstorm (hail)",
        99: "Thunderstorm (heavy hail)",
    };
    return map[code] ?? "—";
}
