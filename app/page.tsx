"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Rocket, Music, PanelsTopLeft, BarChart3, } from "lucide-react";
import { LocalTimeTile } from "@/components/Tiles/LocalTime";
import { QuickLinksTile } from "@/components/Tiles/QuickLinks";
import { DiscordActivityTile } from "@/components/Tiles/DiscordActivity";
import { NowPlayingTile } from "@/components/Tiles/NowPlaying";
import { TechStackTile } from "@/components/Tiles/TechStack";
import { GithubStatsTile } from "@/components/Tiles/GithubStats";
import { SocialsTile } from "@/components/Tiles/Socials";
import { ThemeToggleTile } from "@/components/Tiles/ThemeToggle";
import { ProjectsTile } from "@/components/Tiles/Projects";
import { WeatherMini } from "@/components/Tiles/WeatherMini";
import { AboutTile } from "@/components/Tiles/About";
import { QuotesTile } from "@/components/Tiles/Quotes";

export default function Home() {
    const card =
        "rounded-2xl h-full border border-foreground/10 hover:border-foreground/20 hover:shadow-sm transition-all";
    const header = "pb-0 pt-3 px-3 md:px-4";
    const body = "pt-3 px-3 md:px-4";

    return (
        <main className="w-full h-dvh overflow-hidden px-3 md:px-6 py-4 md:py-6">
            {/* 12 cols × 3 rows, dense packing; every tile <= 4 cols, row-span = 1 */}
            <div className="grid grid-cols-12 grid-rows-[repeat(3,minmax(0,1fr))] grid-flow-dense gap-2 md:gap-3 h-full">

                {/* Row 1 (3 + 4 + 2 + 3 = 12) */}
                {/* About (1) */}
                <AboutTile card={card} />

                {/* Discord (2) */}
                <DiscordActivityTile card={card} header={header} body={body} />

                {/* Projects (3) */}
                <ProjectsTile card={card} header={header} body={body} />

                <div className="col-span-12 md:col-span-3 grid grid-cols-2 gap-2 md:gap-3 items-stretch [grid-auto-rows:minmax(0,1fr)] min-h-0">
                    <NowPlayingTile card={`${card} h-full`} header={header} body={body} />
                    <TechStackTile card={`${card} h-full`} header={header} body={body} />
                </div>

                {/* Socials (5) */}
                <SocialsTile />

                {/* Music Stats (6) */}
                <Card className={`col-span-12 md:col-span-3 ${card}`}>
                    <CardHeader className={`${header} flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                            <BarChart3 size={18} />
                            <h3 className="text-sm font-medium">Music Stats</h3>
                        </div>
                        {/* fake period selector for now */}
                        <div className="hidden md:flex gap-1">
                            <Chip variant="faded" radius="sm">Week</Chip>
                            <Chip variant="faded" radius="sm">Month</Chip>
                            <Chip variant="faded" radius="sm">Year</Chip>
                        </div>
                    </CardHeader>

                    <CardBody className={`${body} flex flex-col gap-3`}>
                        {/* Tiny spark bars – swap with real data later */}
                        <div>
                            <div className="flex items-center justify-between text-xs">
                                <span className="truncate mr-2">Top Tracks</span>
                                <span className="opacity-60">Plays</span>
                            </div>
                            <div className="mt-2 space-y-2">
                                <Spark label="Track A" value={72} />
                                <Spark label="Track B" value={54} />
                                <Spark label="Track C" value={33} />
                            </div>
                        </div>

                        <div className="flex flex-row gap-3">
                            <Chip variant="faded" radius="sm">House</Chip>
                            <Chip variant="faded" radius="sm">Synthwave</Chip>
                            <Chip variant="faded" radius="sm">Lo-fi</Chip>
                        </div>

                        <div className="mt-auto pt-2">
                            <Link href="/music">
                                <Button fullWidth variant="bordered" endContent={<Music size={16} />}>
                                    Open stats
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>


                {/* Theme (7) */}
                <ThemeToggleTile card={card} header={header} body={body} />

                {/* GitHub (8) */}
                <GithubStatsTile card={card} header={header} body={body} />

                {/* Business (9) */}
                <Card className={`col-span-12 md:col-span-3 ${card} overflow-hidden`}>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent" />
                    <CardHeader className={header}>
                        <div className="flex items-center gap-2">
                            <Rocket size={18} />
                            <h3 className="text-sm font-medium">Business Inquiry</h3>
                        </div>
                    </CardHeader>

                    <CardBody className={`${body} relative flex flex-col gap-3`}>
                        <p className="text-sm text-foreground/80">
                            Need a fast, clean web app or embedded integration? I ship end-to-end.
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                            <Chip variant="flat" radius="sm" color="primary">Wordpress</Chip>
                            <Chip variant="flat" radius="sm" color="primary">Laravel</Chip>
                            <Chip variant="flat" radius="sm" color="primary">React</Chip>
                            <Chip variant="flat" radius="sm" color="primary">API's</Chip>
                        </div>

                        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
                            <Link href="https://rg-digital.xyz" target="_blank">
                                <Button fullWidth variant="solid" color="primary">rg-digital.xyz</Button>
                            </Link>
                            <Link href="mailto:info@rg-digital.xyz">
                                <Button fullWidth variant="bordered">Email</Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>

                {/* Quick Links (10) */}
                <QuickLinksTile className="col-span-12 md:col-span-2" />

                {/* Weather (4) */}
                <WeatherMini className={card} />

                {/* Local Time (11) */}
                <LocalTimeTile className="col-span-12 md:col-span-2" />

                <QuotesTile className="col-span-12 md:col-span-2" />
            </div>
        </main>
    );
}




function Tag({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    return (
        <span className={`inline-flex items-center rounded-md border border-foreground/10 px-2 py-[2px] text-[11px] ${className}`}>
            {children}
        </span>
    );
}

function Spark({ label, value }: { label: string; value: number }) {
    return (
        <div className="flex items-center gap-2">
            <span className="truncate text-xs w-24">{label}</span>
            <div className="flex-1 h-2 rounded-full bg-foreground/10 overflow-hidden">
                <div className="h-full rounded-full bg-foreground/40" style={{ width: `${Math.max(4, Math.min(value, 100))}%` }} />
            </div>
            <span className="text-xs tabular-nums w-8 text-right opacity-70">{value}</span>
        </div>
    );
}
