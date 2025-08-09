"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Rocket, Music, PanelsTopLeft, BarChart3, } from "lucide-react";
import { LocalTimeTile } from "@/components/Tiles/LocalTime";
import { QuickLinksTile } from "@/components/Tiles/QuickLinks";
import { DiscordActivityTile } from "@/components/Tiles/DiscordActivity";
import { NowPlayingTile } from "@/components/Tiles/NowPlaying";
import { TechStackTile } from "@/components/Tiles/TechStack";
import { GithubStatsTile } from "@/components/Tiles/GithubStats";
import { SocialsTile } from "@/components/Tiles/Socials";
import { ThemeToggleTile } from "@/components/Tiles/ThemeToggle";

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
                {/* About (3) */}
                <Card className={`col-span-12 md:col-span-3 ${card}`}>
                    <CardBody className="h-full flex flex-col justify-center">
                        <div className="space-y-1">
                            <h2 className="font-semibold text-[clamp(18px,2.2vw,22px)]">Dimitri de Jong</h2>
                            <p className="text-[clamp(12px,1.6vw,14px)] text-foreground/70">Web developer</p>
                        </div>
                    </CardBody>
                </Card>

                {/* Discord (4) */}
                <DiscordActivityTile card={card} header={header} body={body} />

                {/* Projects (3) */}
                <Card className={`col-span-12 md:col-span-3 ${card} relative overflow-hidden`}>

                    <CardHeader className={header}>
                        <div className="flex items-center gap-2">
                            <Rocket size={18} />
                            <h3 className="text-sm font-medium">Projects</h3>
                        </div>
                    </CardHeader>

                    <CardBody className={`${body} flex flex-col gap-3`}>
                        {/* swap these for real data later */}
                        <Link href="https://proluma.nl/" className="group flex items-center justify-between rounded-xl border border-foreground/10 px-3 py-2 hover:border-foreground/20 transition">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">Proluma</p>
                                <div className="mt-1 flex gap-1"><Tag>Wordpress</Tag><Tag>React</Tag><Tag>API's</Tag></div>
                            </div>
                            <PanelsTopLeft className="shrink-0 opacity-60 group-hover:opacity-100" size={16} />
                        </Link>

                        <Link href="https://github.com/RazerGhost/Shiftsail" className="group flex items-center justify-between rounded-xl border border-foreground/10 px-3 py-2 hover:border-foreground/20 transition">
                            <div className="min-w-0">
                                <p className="truncate text-sm font-medium">Shiftsail</p>
                                <div className="mt-1 flex gap-1"><Tag>Laravel</Tag><Tag>PHP</Tag></div>
                            </div>
                            <PanelsTopLeft className="shrink-0 opacity-60 group-hover:opacity-100" size={16} />
                        </Link>

                        <div className="mt-auto pt-2">
                            <Link href="/projects">
                                <Button fullWidth variant="solid" color="primary" endContent={<PanelsTopLeft size={16} />}>
                                    View github projects
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>

                <div className="col-span-12 md:col-span-3 grid grid-cols-2 gap-2 md:gap-3 items-stretch [grid-auto-rows:minmax(0,1fr)] min-h-0">
                    <NowPlayingTile card={`${card} h-full`} header={header} body={body} />
                    <TechStackTile card={`${card} h-full`} header={header} body={body} />
                </div>

                {/* Socials grid (3 cols wide, no wrapper card) */}
                <SocialsTile />

                {/* Music Stats (4) */}
                <Card className={`col-span-12 md:col-span-3 ${card}`}>
                    <CardHeader className={`${header} flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                            <BarChart3 size={18} />
                            <h3 className="text-sm font-medium">Music Stats</h3>
                        </div>
                        {/* fake period selector for now */}
                        <div className="hidden md:flex gap-1">
                            <Tag className="cursor-default">Week</Tag>
                            <Tag className="opacity-60">Month</Tag>
                            <Tag className="opacity-60">Year</Tag>
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

                        <div className="grid grid-cols-3 gap-2 mt-1">
                            <Tag>House</Tag>
                            <Tag>Synthwave</Tag>
                            <Tag>Lo-fi</Tag>
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


                {/* Theme (2) */}
                <ThemeToggleTile card={card} header={header} body={body} />

                {/* GitHub (4) */}
                <GithubStatsTile card={card} header={header} body={body} />

                {/* Business (3) */}
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
                            <Tag>Wordpress</Tag>
                            <Tag>Laravel</Tag>
                            <Tag>React</Tag>
                            <Tag>API's</Tag>
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


                <QuickLinksTile className="col-span-12 md:col-span-2" />

                <LocalTimeTile className="col-span-12 md:col-span-2" />
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
