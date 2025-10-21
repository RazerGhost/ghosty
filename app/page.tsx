"use client";

import { QuickLinksTile } from "@/components/Tiles/QuickLinks";
import { DiscordActivityTile } from "@/components/Tiles/DiscordActivity";
import { NowPlayingTile } from "@/components/Tiles/NowPlaying";
import { TechStackTile } from "@/components/Tiles/TechStack";
import { GithubStatsTile } from "@/components/Tiles/GithubStats";
import { SocialsTile } from "@/components/Tiles/Socials";
import { ProjectsTile } from "@/components/Tiles/Projects";
import { WeatherMini } from "@/components/Tiles/WeatherMini";
import { AboutTile } from "@/components/Tiles/About";
import { VerseOfTheDayTile } from "@/components/Tiles/VerseOfTheDay";
import { MusicStatsTile } from "@/components/Tiles/MusicStats";
import { BusinessCardTile } from "@/components/Tiles/BusinessCard";
import { TimeThemeTile } from "@/components/Tiles/TimeTheme";
import { GhostyTile } from "@/components/Tiles/Ghosty";

export default function Home() {
  const card =
    "rounded-2xl h-full border border-foreground/10 hover:border-foreground/20 hover:shadow-sm transition-all";
  const header = "pb-0 pt-3 px-3 md:px-4";
  const body = "pt-3 px-3 md:px-4";

  return (
    <>
      {/* About (1) */}
      <AboutTile card={card} size="col-span-12 md:col-span-4" />

      <div className="col-span-12 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 items-stretch min-h-0">
        <NowPlayingTile
          body={body}
          card={`${card} h-full`}
          header={header}
          size="col-span-1 md:col-span-4"
        />
        <VerseOfTheDayTile
          body={body}
          card={`${card} h-full`}
          header={header}
          size="col-span-1 md:col-span-4"
        />
      </div>

      {/* Music Stats (6) */}
      <MusicStatsTile
        body={body}
        card={card}
        header={header}
        size="col-span-12 md:col-span-3"
      />

      {/* Theme (7) */}
      <TimeThemeTile
        body={body}
        card={card}
        header={header}
        size="col-span-12 md:col-span-2"
      />

      {/* Discord (2) */}
      <DiscordActivityTile
        body={body}
        card={card}
        header={header}
        size="col-span-12 md:col-span-4"
      />

      {/* Socials (5) */}
      <SocialsTile size="col-span-12 md:col-span-3 grid grid-cols-4 md:grid-cols-3 gap-3" />

      {/* Weather (4) */}
      <WeatherMini
        body={body}
        card={card}
        header={header}
        size="col-span-12 md:col-span-3"
      />

      <GhostyTile card={card} size="hidden md:col-span-2 md:block" />

      {/* GitHub (8) */}
      <GithubStatsTile
        body={body}
        card={card}
        header={header}
        size="col-span-12 md:col-span-3"
      />

      {/* Projects (3) */}
      <ProjectsTile
        body={body}
        card={card}
        header={header}
        size="col-span-12 md:col-span-3"
      />

      <div className="col-span-12 md:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-2 md:gap-3 items-stretch min-h-0">
        <QuickLinksTile
          body={body}
          card={card}
          header={header}
          size="col-span-1 md:col-span-4"
        />
        <TechStackTile
          body={body}
          card={`${card} h-full`}
          header={header}
          size="col-span-1 md:col-span-4"
        />
      </div>

      {/* Business (9) */}
      <BusinessCardTile
        body={body}
        card={card}
        header={header}
        size="col-span-12 md:col-span-3"
      />
    </>
  );
}
