"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import {
    Atom, Music, Braces, Code2, Database, FileCode2,
    ChevronLeft, ChevronRight
} from "lucide-react";

type StackItem = { icon: React.ReactNode; label: string; accent?: string };

const DEFAULT_STACK: StackItem[] = [
    { icon: <Code2 />, label: "PHP", accent: "from-fuchsia-500/30 to-pink-500/20" },
    { icon: <FileCode2 />, label: "HTML", accent: "from-orange-500/30 to-amber-500/20" },
    { icon: <Braces />, label: "CSS", accent: "from-sky-500/30 to-cyan-500/20" },
    { icon: <Code2 />, label: "TypeScript", accent: "from-blue-500/30 to-indigo-500/20" },
    { icon: <Database />, label: "WordPress", accent: "from-emerald-500/30 to-teal-500/20" },
    { icon: <Database />, label: "Laravel", accent: "from-rose-500/30 to-red-500/20" },
    { icon: <Atom />, label: "React", accent: "from-cyan-500/30 to-sky-500/20" },
    { icon: <Atom />, label: "Svelte", accent: "from-orange-500/30 to-red-500/20" },
];

export function TechStackTile({
    items = DEFAULT_STACK,
    card = "",
    header = "",
    body = "",
    autoplay = true,
}: {
    items?: StackItem[];
    card?: string;
    header?: string;
    body?: string;
    autoplay?: boolean;
}) {
    const autoplayRef = React.useRef(Autoplay({ delay: 2800, stopOnInteraction: true }));
    const [emblaRef, embla] = useEmblaCarousel(
        { loop: true, align: "start", dragFree: false, skipSnaps: false },
        autoplay ? [autoplayRef.current] : []
    );

    const [selected, setSelected] = React.useState(0);
    const [snapCount, setSnapCount] = React.useState(0);

    React.useEffect(() => {
        if (!embla) return;
        const onSelect = () => setSelected(embla.selectedScrollSnap());
        const onInit = () => setSnapCount(embla.scrollSnapList().length);
        embla.on("select", onSelect);
        embla.on("reInit", () => { onInit(); onSelect(); });
        onInit(); onSelect();
    }, [embla]);

    // Pause/resume autoplay on hover to avoid “running away”
    const stop = () => autoplay && autoplayRef.current && autoplayRef.current.stop();
    const play = () => autoplay && autoplayRef.current && autoplayRef.current.play();

    return (
        <Card className={`col-span-12 md:col-span-4 h-full flex flex-col ${card}`}>
            <CardHeader className={`${header} flex items-center justify-between`}>
                <span className="text-sm font-medium">Tech Stack I use</span>
            </CardHeader>

            <CardBody
                className={`pt-2 px-0 overflow-hidden justify-center items-center`}
                onMouseEnter={stop}
                onMouseLeave={play}
                role="region"
                aria-roledescription="carousel"
                aria-label="Technology stack carousel"
            >
                {/* viewport */}
                <div className="overflow-hidden" ref={emblaRef}>
                    {/* track */}
                    <div className="flex">
                        {items.map((it, i) => (
                            <div
                                key={`${it.label}-${i}`}
                                className="px-3 shrink-0 basis-1/2 md:basis-1/4 lg:basis-1/5"
                                role="group"
                                aria-label={`${it.label} (${i + 1} of ${items.length})`}
                            >
                                <TechSlide icon={it.icon} label={it.label} accent={it.accent} />
                            </div>
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

function TechSlide({
    icon,
    label,
    accent,
}: {
    icon: React.ReactNode;
    label: string;
    accent?: string;
}) {
    return (
        <Tooltip content={label}>
            <div
                tabIndex={0}
                className=" group relative overflow-hidden h-12 md:h-14 rounded-xl border border-foreground/10 p-3 md:p-3.5 transition hover:border-foreground/20 hover:shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 bg-transparent">
                {/* gradient layer */}
                <span
                    className={` absolute inset-0 z-0 bg-gradient-to-br ${accent ?? "from-foreground/5 to-transparent"} opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100`}
                />

                {/* content */}
                <div className="relative z-10 flex items-center gap-3">
                    <span className="shrink-0 text-base md:text-lg">{icon}</span>
                    <span className="text-sm font-medium truncate">{label}</span>
                </div>
            </div>
        </Tooltip>
    );
}


/* Nav
    <div className="hidden md:flex gap-1">
        <Button isIconOnly size="sm" variant="flat" aria-label="Previous" onPress={() => embla?.scrollPrev()}>
            <ChevronLeft size={16} />
        </Button>
        <Button isIconOnly size="sm" variant="flat" aria-label="Next" onPress={() => embla?.scrollNext()}>
            <ChevronRight size={16} />
        </Button>
    </div>
*/
