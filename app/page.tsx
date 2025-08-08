"use client";

import Link from "next/link";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Chip } from "@heroui/chip";
import { Tooltip } from "@heroui/tooltip";
import {
    Github, Mail, Atom, Rocket, Music, Braces, Code2, Database, FileCode2, PanelsTopLeft,
    Linkedin, BarChart3, Headphones, Instagram,
    Drama
} from "lucide-react";
import { DiscordLogoIcon } from "@radix-ui/react-icons"
import { LocalTimeTile } from "@/components/Tiles/LocalTime";
import { QuickLinksTile } from "@/components/Tiles/QuickLinks";
import { ThemeSwitch } from "@/components/theme-switch";
import { DiscordActivityTile } from "@/components/Tiles/DiscordActivity";

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
                <DiscordActivityTile />

                {/* Projects (3) */}
                <Card className={`col-span-12 md:col-span-3 ${card} relative overflow-hidden`}>
                    {/* corner watermark */}
                    <div className="pointer-events-none absolute -right-6 -top-6 opacity-10">
                        <Rocket size={120} />
                    </div>

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

                {/* Row 2 */}
                {/* Spotify (4) */}
                <Card className={`col-span-12 md:col-span-4  ${card}`}>
                    <CardHeader className={`${header} flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                            <Headphones size={18} />
                            <span className="text-sm font-medium">Now Playing</span>
                        </div>
                        <Chip size="sm" variant="flat">Spotify</Chip>
                    </CardHeader>
                    <CardBody className={`${body}`}>
                        <div className="flex items-center gap-4">
                            <div className="size-14 md:size-16 rounded-xl bg-foreground/10" aria-label="Album art" />
                            <div className="min-w-0 w-full">
                                <p className="truncate font-medium text-[clamp(13px,2vw,15px)]">Song Title — Artist</p>
                                <p className="text-[11px] md:text-xs text-foreground/60 truncate">Album Name</p>
                                <div className="mt-2 h-2 w-full rounded-full bg-foreground/10 overflow-hidden">
                                    <div className="h-2 w-1/3 rounded-full bg-foreground/40" />
                                </div>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Socials grid (3 cols wide, no wrapper card) */}
                <div className="col-span-10 md:col-span-3 grid grid-cols-4 md:grid-cols-3 gap-2 md:gap-3">
                    <SocialMini href="https://github.com/RazerGhost" label="GitHub"><Github size={18} /></SocialMini>
                    <SocialMini href="https://www.linkedin.com/in/dimitri-eleazar-de-jong/" label="LinkedIn"><Linkedin size={18} /></SocialMini>
                    <SocialMini href="mailto:info@rg-digital.xyz" label="Email"><Mail size={18} /></SocialMini>
                    <SocialMini href="https://discord.com/users/425729668482859008" label="Discord"><DiscordLogoIcon /></SocialMini>
                    <SocialMini href="https://mydramalist.com/profile/RazerGhost" label="MyDramaList"><Drama size={18} /></SocialMini>
                    <SocialMini href="https://www.instagram.com/d1mitrl/" label="Instagram"><Instagram size={18} /></SocialMini>
                </div>

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
                <Card className={`col-span-6 md:col-span-2 ${card}`}>
                    <CardBody className="h-full grid place-items-center">
                        <ThemeSwitch />
                    </CardBody>
                </Card>

                {/* Row 3 (3 + 4 + 3 + 2 = 12) */}
                {/* GitHub (4) */}
                <Card className={`col-span-12 md:col-span-4 ${card}`}>
                    <CardHeader className={`${header} flex items-center justify-between`}>
                        <div className="flex items-center gap-2">
                            <Github size={18} />
                            <span className="text-sm font-medium">GitHub</span>
                        </div>
                        <Chip size="sm" variant="flat">Stats</Chip>
                    </CardHeader>
                    <CardBody className={`${body} flex flex-col gap-4`}>
                        <div className="flex flex-wrap gap-2">
                            <Chip variant="flat">Repos: 24</Chip>
                            <Chip variant="flat">Stars: 102</Chip>
                            <Chip variant="flat">PRs: 58</Chip>
                        </div>
                        <div className="h-20 md:h-24 rounded-xl bg-foreground/10 grid place-items-center text-xs text-foreground/60">
                            Contribution heatmap placeholder
                        </div>
                        <div className="mt-auto flex justify-end">
                            <Link href="https://github.com/" target="_blank">
                                <Button size="sm" variant="bordered" endContent={<PanelsTopLeft size={16} />}>View Profile</Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>

                {/* Tech (3) */}
                <Card className={`col-span-12 md:col-span-3 ${card}`}>
                    <CardHeader className={header}><span className="text-sm font-medium">Tech Stack</span></CardHeader>
                    <CardBody className={`${body}`}>
                        <div className="grid grid-cols-3 gap-2 md:gap-3">
                            <TechIcon icon={<Code2 />} label="TypeScript" />
                            <TechIcon icon={<FileCode2 />} label="Next.js" />
                            <TechIcon icon={<Database />} label="Turso" />
                            <TechIcon icon={<Atom />} label="React" />
                            <TechIcon icon={<Braces />} label="Tailwind" />
                            <TechIcon icon={<Music />} label="Spotify API" />
                        </div>
                    </CardBody>
                </Card>

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

/* Helpers */
function TechIcon({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="flex items-center gap-2 rounded-xl border border-foreground/10 p-2.5 md:p-3">
            <span className="shrink-0">{icon}</span>
            <span className="text-sm truncate">{label}</span>
        </div>
    );
}

function SocialMini({
    href,
    label,
    children,
}: {
    href: string;
    label: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            aria-label={label}
            title={label}
            target={href.startsWith("http") ? "_blank" : undefined}
            className="group rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
        >
            <Card className="rounded-2xl h-full border border-foreground/10 group-hover:border-foreground/20 group-hover:shadow-sm transition-all">
                <CardBody className="aspect-square grid place-items-center">
                    <div className="opacity-80 group-hover:opacity-100 text-sm">{children}</div>
                </CardBody>
            </Card>
        </Link>
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
