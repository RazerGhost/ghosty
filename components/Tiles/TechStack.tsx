"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Tooltip } from "@heroui/tooltip";
import {
    Atom, Music, Braces, Code2, Database, FileCode2,
    ChevronLeft, ChevronRight
} from "lucide-react";

type StackItem = { icon: React.ReactNode; label: string };

const DEFAULT_STACK: StackItem[] = [
    { icon: <Code2 />, label: "PHP" },
    { icon: <FileCode2 />, label: "HTML" },
    { icon: <Braces />, label: "CSS" },
    { icon: <Code2 />, label: "TypeScript" },
    { icon: <Database />, label: "WordPress" },
    { icon: <Database />, label: "Laravel" },
    { icon: <Atom />, label: "React" },
    { icon: <Atom />, label: "Svelte" },
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
    const autoplayRef = React.useRef(
        Autoplay({ delay: 2600, stopOnInteraction: true })
    );

    const [emblaRef, embla] = useEmblaCarousel(
        {
            loop: true,
            align: "start",
            // responsive slides-per-view via CSS (see .basis- classes below)
            dragFree: false,
            skipSnaps: false,
        },
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
        onInit();
        onSelect();
    }, [embla]);

    return (
        <Card className={`col-span-12 md:col-span-4 h-full flex flex-col ${card}`}>
            <CardHeader className={`${header} flex items-center justify-between`}>
                <span className="text-sm font-medium">Tech Stack</span>
            </CardHeader>

            <CardBody className={` pt-2 px-0 justify-center items-center overflow-hidden`}>
                {/* Embla viewport */}
                <div className="overflow-hidden" ref={emblaRef}>
                    {/* Embla track */}
                    <div className="flex">
                        {items.map((it, i) => (
                            <div
                                key={`${it.label}-${i}`}
                                className=" px-3 basis-1/2 md:basis-1/3 lg:basis-1/5 shrink-0">
                                <TechSlide icon={it.icon} label={it.label} />
                            </div>
                        ))}
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

function TechSlide({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <div className="h-12 md:h-14 rounded-xl border border-foreground/10 p-3 md:p-4
                    hover:border-foreground/20 hover:shadow-sm transition flex items-center gap-3">
            <span className="shrink-0 text-base md:text-lg">{icon}</span>
            <span className="text-sm font-medium truncate">{label}</span>
        </div>
    );
}

/*

Navigation
    <div className="hidden md:flex gap-1">
        <Button isIconOnly size="sm" variant="flat" aria-label="Previous" onPress={() => embla?.scrollPrev()}>
            <ChevronLeft size={16} />
        </Button>
        <Button isIconOnly size="sm" variant="flat" aria-label="Next" onPress={() => embla?.scrollNext()}>
            <ChevronRight size={16} />
        </Button>
    </div>

Dots
    <div className="mt-3 flex justify-center gap-1.5">
        {Array.from({ length: snapCount }).map((_, i) => (
            <button
                key={i}
                onClick={() => embla?.scrollTo(i)}
                className={`size-1.5 rounded-full ${selected === i ? "bg-foreground" : "bg-foreground/30"}`}
                aria-label={`Go to slide ${i + 1}`}
            />
        ))}
    </div>
*/
