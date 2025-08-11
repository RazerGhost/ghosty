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
import { MusicStatsTile } from "@/components/Tiles/MusicStats";
import { BusinessCardTile } from "@/components/Tiles/BusinessCard";

export default function Home() {
    const card =
        "rounded-2xl h-full border border-foreground/10 hover:border-foreground/20 hover:shadow-sm transition-all";
    const header = "pb-0 pt-3 px-3 md:px-4";
    const body = "pt-3 px-3 md:px-4";

    return (
        <main className="w-full h-dvh overflow-hidden px-3 md:px-6 py-4 md:py-6">
            {/* 12 cols × 3 rows, dense packing; every tile <= 4 cols, row-span = 1 */}
            <div className="grid grid-cols-12 grid-rows-[repeat(3,minmax(0,1fr))] grid-flow-dense gap-2 md:gap-3 h-full">

                {/* About (1) */}
                <AboutTile card={card} size="col-span-12 md:col-span-3" />

                {/* Discord (2) */}
                <DiscordActivityTile card={card} header={header} body={body} size="col-span-12 md:col-span-4" />

                {/* Projects (3) */}
                <ProjectsTile size="col-span-12 md:col-span-3" card={card} header={header} body={body} />

                <div className="col-span-12 md:col-span-3 grid grid-cols-2 gap-2 md:gap-3 items-stretch [grid-auto-rows:minmax(0,1fr)] min-h-0">
                    <NowPlayingTile card={`${card} h-full`} header={header} body={body} size="col-span-12 md:col-span-4" />
                    <TechStackTile card={`${card} h-full`} header={header} body={body} size="col-span-12 md:col-span-4" />
                </div>

                {/* Socials (5) */}
                <SocialsTile size="col-span-10 md:col-span-3 grid grid-cols-4 md:grid-cols-3 gap-2 md:gap-3 h-full" />

                {/* Music Stats (6) */}
                <MusicStatsTile card={card} header={header} body={body} size="col-span-12 md:col-span-3" />

                {/* Theme (7) */}
                <ThemeToggleTile card={card} header={header} body={body} size="col-span-6 md:col-span-2" />

                {/* GitHub (8) */}
                <GithubStatsTile card={card} header={header} body={body} size="col-span-12 md:col-span-4" />

                {/* Business (9) */}
                <BusinessCardTile card={card} header={header} body={body} size="col-span-12 md:col-span-3" />

                {/* Quick Links (10) */}
                <QuickLinksTile card={card} header={header} body={body} size="col-span-12 md:col-span-2" />

                {/* Weather (4) */}
                <WeatherMini card={card} header={header} body={body} size="col-span-12 md:col-span-2" />

                {/* Local Time (11) */}
                <LocalTimeTile card={card} header={header} body={body} size="col-span-12 md:col-span-2" />

                <QuotesTile card={card} header={header} body={body} size="col-span-12 md:col-span-2" />
            </div>
        </main>
    );
}
